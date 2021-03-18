setManifest = (json) => {
    this.setState({manifest: json})
  }
  

  getManifest = async () => {
    const { squad } = this.state
    fetch('/data/manifest.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    ).then((response) => {
      return response.json()
    }).then((manifest) => {
      this.setManifest(manifest)
      this.getData(manifest)
    });
  }

  getData = async (manifest) => {
    const getProperty = (val,property) => {
      this.loading.active = true
      this.loading.fetches.push(
        fetch(val).then((response) => {
          return response.json()
        }).then((data) => {
          if(typeof(this.state[property]) === 'undefined'){
            const newState = {}
            newState[property] = []
            this.setState(newState)
          }
          const joined = this.state[property].concat(data)
          const newData = {}
          newData[property] = joined
          this.setState(newData)
          this.loading.active = false
          return property
        }).catch( err => {return err })
      )
    }

    for(const property in manifest ){
      if(Array.isArray(manifest[property])){
        manifest[property].map( val => {
            switch(true){
            case typeof(val) === 'string':
              getProperty(val,property)
              break
            case typeof(val) === 'object':
              for(const property in val){
                if(Array.isArray(val[property])) {
                  val[property].map( (i) => {
                    getProperty(i,property)
                  })
                }      
              }
          }
        })
      }
    }
    Promise.all(this.loading.fetches).then( (a) => {
      //console.log(a,this.loading)
      if(!this.loading.active){
        //console.log (this.state);
        this.getShips()
        this.setState({damageDeck: this.createDamageDeck()})
      }
    });
  }
