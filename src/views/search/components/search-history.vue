<template>
    <div class="search-history">
        <van-cell
           center
           title="搜索历史"
        >
            <div class="right" @click="isDelete=!isDelete">
                <div v-if="isDelete">
                    <span>全部删除</span>
                    &nbsp;&nbsp;
                    <span>完成</span>
                </div>
                <van-icon
                    name="delete"
                    v-else
                />
            </div>
        </van-cell>
        <van-cell
           v-for="(item,index) in searchHistory"
           :key = index
           center
           icon="clock-o"
           :title="item"
        >
            <van-icon name="close" />
        </van-cell>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isDelete: false
    }
  },
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
   /deep/ .van-cell__value {
        flex: unset;
        width: 80px;
    }
}

</style>
