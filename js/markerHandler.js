AFRAME.registerComponent("marker-handler",{

    init:async function(){

        var toys = await this.getToys();

        this.el.addEventListener("markerFound", () => {
            var markerId = this.el.id;      
            this.handleMarkerFound(toys, markerId);
          });

        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost();
          });
    },

    handleMarkerFound:function(){
        var buttonDiv=document.getElementById("button-div")
        buttonDiv.style.display="flex"

        var ORDER_SUMMARY_Button=document.getElementById("summary-button")
        var orderButton=document.getElementById("order-button")

        ORDER_SUMMARY_Button.addEventListener("click",function(){
            swal({
                icon: "warning",
                title: "Order Summary",
                text: "Work in progress"
            })
        })

        orderButton.addEventListener("click",function(){
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks for Order!",
                text: "Your order will be come soon!",
            })
        })
        var toy = toys.filter(toys => toys.id === markerId)[0];

        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
    },
    handleMarkerLost:function(){
        
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";

    },
    getToys: async function () {

        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
      });
  }
})