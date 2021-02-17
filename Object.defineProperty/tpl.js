export default function tpl(data) {
  return `
    <p>姓名：<span class="__name">${data.name || '未录入'}</span></p>
    <p>邮箱：<span class="__email">${data.email || '未录入'}</span></p>
    <p>年龄：<span class="__age">${data.age || '未录入'}</span></p>
  `;
}