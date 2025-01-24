export default [
  {
    url: '/mock/test',
    method: 'get',
    response: {
      code: 200,
      data: {
        name: 'uni-vt'
      }
    }
  },
  {
    url: '/mock/waterfall',
    method: 'get',
    response: {
      code: 200,
      data: {
        items: [
          {
            name: '瀑布1',
            url: 'https://img2.pconline.com.cn/pconline/0707/13/1057264_070717dog18.jpg',
            avator: 'https://example.com/avatar1.jpg',
            content: '这是一个美丽的瀑布，水流湍急，景色宜人。'
          },
          {
            name: '瀑布2',
            url: 'https://ts1.cn.mm.bing.net/th/id/R-C.d76326165748dc67c1447f7195dfc4a2?rik=0u4SQmovQBA2CA&pid=ImgRaw&r=0',
            avator: 'https://example.com/avatar2.jpg',
            content: '瀑布从高处倾泻而下，形成了一道壮观的自然景观。'
          },
          {
            name: '瀑布3',
            url: 'https://img2.pconline.com.cn/pconline/0707/13/1057264_070717dog18.jpg',
            avator: 'https://example.com/avatar3.jpg',
            content: '这里的瀑布周围绿树环绕，空气清新，是休闲的好去处。'
          },
          {
            name: '瀑布4',
            url: 'https://img2.pconline.com.cn/pconline/0707/13/1057264_070717dog18.jpg',
            avator: 'https://example.com/avatar4.jpg',
            content: '瀑布的水流在阳光下闪烁着光芒，仿佛一条银色的绸带。'
          },
          {
            name: '瀑布5',
            url: 'https://bpic.588ku.com/back_origin_min_pic/22/08/24/dadec5d75534ef748e0a259e39c5aabd.jpg',
            avator: 'https://example.com/avatar5.jpg',
            content: '这个瀑布位于山谷之中，四周景色秀丽，值得一游。'
          }
        ],
        total: 5
      }
    }
  }
]
