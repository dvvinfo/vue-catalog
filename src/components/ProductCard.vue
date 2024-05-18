<template>
  <div class="product">
    <div class="product__container">
      <div class="product__img">
        <img :src="product.main_image_thumb_300" :alt="product.present_name" />
      </div>

      <div class="product__info">
        <span class="product__category"> {{ product.category.name }}</span>
        <h3 class="product__title">{{ product.present_name }}</h3>
        <div class="product__description" v-if="product.comment_name">
          {{ product.comment_name }}
        </div>
        <div class="product__price">{{ product.price }} ₽</div>
      </div>
    </div>

    <CustomButton v-if="product.allowed" class="product__btn--disabled" fontSize="18px"
      >Нет в наличии</CustomButton
    >
    <CustomButton v-else class="product__btn" fontSize="18px">В корзину</CustomButton>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'
export default {
  name: 'ProductCard',
  components: {
    CustomButton
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product {
  width: 276px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px 23px 32px;
  background-color: var(--color-text-white);
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 0px 0px 5px 5px;
}
.product__category {
  display: block;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  width: 100%;
  color: var(--color-text-gray);
}
.product__img {
  width: 226px;
  margin: 0 auto;
}
.product__img img {
  width: 100%;
}
.product__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 4px;
}
.product__description {
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin-top: 9px;
}
.product__price {
  font-size: 26px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 14px;
}
.product__btn {
  width: 100%;
  text-transform: none;
  margin-top: 22px;
}
.product__btn--disabled {
  width: 100%;
 text-transform: none;
  margin-top: 22px;
  background: var(--color-background);
  border: 1px solid var(--color-border-input);
  color: var(--color-text-black);
  cursor: not-allowed;
  font-weight: bold;
  opacity: 0.6;
}
</style>
