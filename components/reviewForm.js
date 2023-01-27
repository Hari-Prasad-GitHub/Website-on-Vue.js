app.component('review-form',{
    template:
    /*html*/
    `<form class=review-form @submit.prevent='onSubmit'> <!-- prevents browser refresh-->
    <h3>leave a review</h3>
    <label for='name'>Name: </label>
    <input id='name' v-model='name'>

    <label for='review'>Review: </label>
    <textarea id='review' v-model='review'></textarea>

    <label for='Rating'>Rating: </label>
    <select id='Rating' v-model.number='rating'>
    <option> 5 </option>
    <option> 4 </option>
    <option> 3 </option>
    <option> 2 </option>
    <option> 1 </option>
    </select>

    <input class='button' type='submit' value='Submit'>
    </form>`,

    data(){
        return{
            name: '',
            review: '',
            rating: null,
        }
    },

    methods: {
        onSubmit(){
            if(this.name === '' || this.rating===null){
                alert('Review is incomplete, please enter Name and Rating :)')
                return
            }

            let productReview={
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview), //sends productReview as payload
            this.name='',
            this.review='',
            this.rating=null
        }
    },
})