<template>
  <div class="movies-pagination d-flex justify-content-center">
    <BPagination v-model="currentPageModel"
      :total-rows="total"
      :per-page="perPage"
      next-text="Next"
      prev-text="Prev">
    </BPagination>
  </div>
</template>

<script>
export default {
name: 'MoviesPaginator',
props:{
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 1
  },
},
computed:{
   currentPageModel: {
     get() { return this.currentPage},
     set(value) { this.$emit('changedPage', value) }
    }
  },
}
</script>

<style scoped>
.movies-pagination{
  margin-top: auto;
}
.movies-pagination >>> .pagination .page-item .page-link{
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}

.movies-pagination >>> .pagination .page-item.active .page-link{
border-color: #fff;
background-color: #fff;
color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link{
  color: lightgrey;
}

</style>