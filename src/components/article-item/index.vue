<template>
    <div>
        <van-cell class="article-item">
            <div class="title van-multi-ellipsis--l3" slot="title">{{ article.title }}</div>
            <div slot="label">
                 <div class="label-cover" v-if="article.cover.type === 3">
                     <div
                     class="label-cover-item"
                     v-for="(item,index) in article.cover.images"
                     :key="index"
                     >
                        <van-image
                        class="cover-item"
                        fit="cover"
                        :src="item"
                        />
                     </div>
                 </div>
                <div class="label-foot">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate }}</span>
                </div>
            </div>
            <van-image
             v-if="article.cover.type === 1"
             class="right"
             fit="cover"
             :src="article.cover.images[0]" />
        </van-cell>
    </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }
    .van-cell__value {
       flex: unset;
       width: 116px;
       height: 73px;
       margin-left: 10px;
       .right {
       width: 116px;
       height: 73px;
    }
    }
    .label-cover {
        padding: 15px 0;
        display: flex;
        .label-cover-item {
            flex: 1;
            height: 73px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item {
                width: 100%;
                height: 73px;
            }
        }
    }
    .label-foot {
        font-size: 11px;
        color: #cccccc;
        span {
            margin: 0 5px;
        }
    }
}
</style>
