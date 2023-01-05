AFRAME.registerComponent("create-markers", {
  
  //Add Code Here!

  init: async function(){
    var scene= document.querySelector("#main-scene")

    var toys= await this.gettToys()
    toys.map(dish=>{
      
      var marker= document.createElement("a-marker")
      marker.setAttribute("id", toys.id)
      marker.setAttribute("type", "pattern")
      marker.setAttribute("url", dish.marker_pattern_url)
      marker.setAttribute("cursor", {
        rayOrigin: "mouse",
      })
      marker.setAttribute("markerhandler", {})
      scene.appendChild(marker)

      var model= document.createElement("a-entity")
      model.setAttribute("id", `model-${toys.id}`)
      model.setAttribute("position", toys.model_geometry.position)
      model.setAttribute("rotation", toys.model_geometry.rotation)
      model.setAttribute("scale", toys.model_geometry.scale)
      model.setAttribute("gltf-model", `url(${toys.model_url})`)
      model.setAttribute("gesture-handler", {})

      marker.appendChild(model)
    })
  },

  getToys: async function(){
    return await firebase
                .firestore()
                .collection("toys")
                .get()
                .then(snap=>{
                  return snap.docs.map(doc=>doc.data())
                })
  }
  
  });
