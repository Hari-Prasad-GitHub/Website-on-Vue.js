app.component("product-display", {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :class="{'out-of-stock-img': !inStock}" v-bind:src="image" />
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out of stock</p>
                    <p>shipping: {{shipping}}</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>
                    <div
                        v-for="(variant, index) in variants"
                        :key="variant.id"
                        @mouseover="updateVariant(index)"
                        class="color-circle"
                        :style="{backgroundColor: variant.color}"
                    ></div>
                    <button
                        class="button"
                        v-on:click="addToCart"
                        :class="{disabledButton: !inStock}"
                        :disabled="!inStock"
                    >
                    Add to Cart
                    </button>
                    <button
                        class="button"
                        v-on:click="removeItemFromCart"
                        :disabled="!inStock"
                        :class="{disabledButton: !inStock}"
                    >
                    Remove Item
                    </button>
                </div>
        </div >
        <review-list v-if='reviews.length' :reviews='reviews'></review-list>
        <review-form @review-submitted='addReview'></review-form>
      </div >`,
    data() {
        return {
            product: "socks",
            description: "can be weared",
            selectedVariant: 0,
            details: ["50% cotton", "30% polyster", "20% teflon"],
            variants: [
                {
                    id: 256,
                    color: "Green",
                    image: "./assets/images/socks_green.jpg",
                    quantity: 50,
                },
                {
                    id: 257,
                    color: "blue",
                    image: "./assets/images/socks_blue.jpg",
                    quantity: 10,
                },
            ],
            reviews:[],
            brand: "Rolex",
        };
    },

    methods: {
        addToCart() {
            this.$emit('add-To-Cart', this.variants[this.selectedVariant].id)
        },
        removeItemFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review){
            this.reviews.push(review)
        },
    },

    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping(){
            if (this.premium){
                return 'free'
            }
            return 100
        }
    },
});
