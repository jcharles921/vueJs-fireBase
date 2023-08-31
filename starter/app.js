const app = Vue.createApp({
    // template:'<h1>Hello charles  from template</h1>'
    data(){
        return{
            title:"the final count down ",
            url:"https://www.youtube.com/watch?v=9jK-NcRmVcw",
           mangas:[
                {name:"one punch man",author:"one",img:"./assets/Saitama.jpg" ,isFav:true},
                {name:"berserker",author:"kentaro",img:"./assets/Guts.jpg",isFav:false},
                {name:"HxH",author:"togashi" ,img:"./assets/Hisoka.jpg",isFav:true},
                {name:"Bakemonogatari",author:"nisiOisiN",img:"./assets/Hanekawa.jpeg",isFav:false},
            ],
            number:23,
            isOtaku:false,
            revel:"show",
            x:0,
            y:0
        }
    },
    methods:{
        down(){
            this.number--
        },
        show(){
           
            if(this.isOtaku){
                this.isOtaku=false
                this.revel="show"
            }
            else{
                this.isOtaku=true
                this.revel="hide"
            }
        },
        handlerEvent(e,n){
            // console.log(e,n)
            const target = e.target
            return target.classList.add('color')
        },
        removeColor(e){
            return e.target.classList.remove('color')
        },
        handleMouve(e){
            this.x= e.offsetX
            this.y=e.offsetY

        },
        like(e,manga){
            console.log(e.target.parentNode)
            manga.isFav=!manga.isFav
          
        }

    },
    computed:{
        favoriteMangas(){
            const fav = this.mangas.filter(manga=>manga.isFav)
            return fav.length
        }
    }
})
app.mount("#app")
