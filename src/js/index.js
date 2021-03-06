import $ from 'jquery';
import '../style/index.less';

import { throttle, debounce } from '../utils';
import {
  findParenNode,
  renderBookmark,
  renderTableBookMark,
  renderRowTableBookMark,
  renderColTableBookMark,
  renderMergeTableBookMark,
} from '../utils/template';

class Index {
  constructor(){
    $('#root').text('Index 你好，啦啦啦');
    this.init();

  }

  init() {
    const mouseMove = (params) => {
      console.log('mouseMove：', params);
    }
    const onInput = (params) => {
      console.log('input:', params);
    }
    // 函数节流
    $('body').on('mousemove', () => {
      throttle(mouseMove, this, 50, '你好', 2000);
    });
    // 防抖
    $('#input').on('input', () => {
      debounce(onInput, this, 500, {
        text: '你好',
      });
    });

    // fetch
    fetch('/api/v1/topics')
      .then(response => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        return response.json()
      })
      .then(res => {
        console.log('res:', res)
      })

    $('#replaceData').on('click', () => {
      this.renderData();
    });
  }

 renderData() {
    // 行替换，列替换
   const bmarkName = [
     '张三',
     '李四',
   ];
   const bmarkAge = [
     10,
     20,
     30,
   ];
    // 普通书签
   const bookmark = [
     ['姓名', "年龄", '张三', '李四', '王五'],
     [null, 4, null, 4, 4],
     [4, null, null, 4, null],
     [4, null, 4, null, null],
   ];
    // 需要合并的书签
   const margeBookmark1 = [
     [null, 2,    3, null, 5],
     [null, 2,    3, 4,    5],
     [1,    null, 3, null, null],
     [null, 2,    3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, null, 3, null, 5],
     [1,    null, 3, 4,    5],
     [null, 2,    3, null, 5],
   ];
   const margeBookmark2 = [
     [null, null, 2],
     [10,   null, 12],
     [null, 12, 22],
     [null, 31, null],
   ];

   renderBookmark('你好', document.querySelector('.code-GP0061234567891'));
   renderMergeTableBookMark(margeBookmark2, document.querySelector('.code-GP0061234567890'));

   renderRowTableBookMark(bmarkName, document.querySelector('.code-GP0061234567801'));
   renderRowTableBookMark(bmarkAge, document.querySelector('.code-GP0061234567802'));
   renderRowTableBookMark(bmarkName, document.querySelector('.code-GP0061234567803'));
   renderRowTableBookMark(bmarkAge, document.querySelector('.code-GP0061234567804'));

   renderColTableBookMark(bmarkName, document.querySelector('.code-GP0061234567805'));
   renderColTableBookMark(bmarkAge, document.querySelector('.code-GP0061234567806'));

   renderBookmark('', document.querySelector('.code-GP1'));
   renderBookmark('', document.querySelector('.code-GP2'));
 }
}

$(() => {
  new Index();
});
// slice splice split