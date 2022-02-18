amis.define('docs/zh-CN/components/log.md', function(require, exports, module, define) {

  module.exports = {
    "title": "Log 实时日志",
    "description": null,
    "type": 0,
    "group": "⚙ 组件",
    "menuName": "Log",
    "icon": null,
    "order": 56,
    "html": "<div class=\"markdown-body\"><p>用于实时显示日志或程序输出结果。</p>\n<h2><a class=\"anchor\" name=\"%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95\" href=\"#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>基本用法</h2><p>通过设置 source 来获取日志，支持 ANSI 基本颜色显示。</p>\n<pre><code class=\"language-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"log\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"height\"</span><span class=\"token operator\">:</span> <span class=\"token number\">300</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"source\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"http://localhost:3000/\"</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<p>由于缺少线上服务，所以这个例子无法在线演，它的运行效果如下图所示</p>\n<p><img src=\"https://suda.cdn.bcebos.com/images%2Famis%2Flog.gif\" alt=\"示例\"></p>\n<h3><a class=\"anchor\" name=\"%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%8F%82%E8%80%83\" href=\"#%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%8F%82%E8%80%83\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>后端实现参考</h3><p>后端需要通过流的方式输出结果，比如 Node 实现示例：</p>\n<pre><code class=\"language-javascript\"><span class=\"token keyword\">const</span> http <span class=\"token operator\">=</span> <span class=\"token function\">require</span><span class=\"token punctuation\">(</span><span class=\"token string\">'http'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">let</span> app <span class=\"token operator\">=</span> http<span class=\"token punctuation\">.</span><span class=\"token function\">createServer</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">(</span><span class=\"token parameter\">req<span class=\"token punctuation\">,</span> res</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n  res<span class=\"token punctuation\">.</span><span class=\"token function\">writeHead</span><span class=\"token punctuation\">(</span><span class=\"token number\">200</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token string-property property\">'Content-Type'</span><span class=\"token operator\">:</span> <span class=\"token string\">'text/plain'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token string-property property\">'Access-Control-Allow-Origin'</span><span class=\"token operator\">:</span> <span class=\"token string\">'*'</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token keyword\">let</span> index <span class=\"token operator\">=</span> <span class=\"token number\">1</span><span class=\"token punctuation\">;</span>\n  <span class=\"token keyword\">let</span> timer <span class=\"token operator\">=</span> <span class=\"token function\">setInterval</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">if</span> <span class=\"token punctuation\">(</span>index <span class=\"token operator\">&lt;</span> <span class=\"token number\">50</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n      <span class=\"token comment\">// 每次 write 都会立刻传给前端</span>\n      res<span class=\"token punctuation\">.</span><span class=\"token function\">write</span><span class=\"token punctuation\">(</span><span class=\"token template-string\"><span class=\"token template-punctuation string\">`</span><span class=\"token string\">line: </span><span class=\"token interpolation\"><span class=\"token interpolation-punctuation punctuation\">${</span>index<span class=\"token interpolation-punctuation punctuation\">}</span></span><span class=\"token string\">\\n</span><span class=\"token template-punctuation string\">`</span></span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      index <span class=\"token operator\">+=</span> <span class=\"token number\">1</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span> <span class=\"token keyword\">else</span> <span class=\"token punctuation\">{</span>\n      res<span class=\"token punctuation\">.</span><span class=\"token function\">end</span><span class=\"token punctuation\">(</span><span class=\"token string\">'end'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      <span class=\"token function\">clearInterval</span><span class=\"token punctuation\">(</span>timer<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span> <span class=\"token number\">100</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\napp<span class=\"token punctuation\">.</span><span class=\"token function\">listen</span><span class=\"token punctuation\">(</span><span class=\"token number\">3000</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'127.0.0.1'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\nconsole<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'Node server running on port 3000'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n</code></pre>\n<p>其它语言请查找如何使用 stream 的方式返回内容，比如 Spring 的 <code>StreamingResponseBody</code>：</p>\n<pre><code class=\"language-java\"><span class=\"token annotation punctuation\">@Controller</span>\n<span class=\"token keyword\">public</span> <span class=\"token keyword\">class</span> <span class=\"token class-name\">StreamingResponseBodyController</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token annotation punctuation\">@GetMapping</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"/logs\"</span><span class=\"token punctuation\">)</span>\n    <span class=\"token keyword\">public</span> <span class=\"token class-name\">ResponseEntity</span><span class=\"token generics\"><span class=\"token punctuation\">&lt;</span><span class=\"token class-name\">StreamingResponseBody</span><span class=\"token punctuation\">></span></span> <span class=\"token function\">handleLog</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token class-name\">StreamingResponseBody</span> stream <span class=\"token operator\">=</span> out <span class=\"token operator\">-></span> <span class=\"token punctuation\">{</span>\n          <span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">int</span> i <span class=\"token operator\">=</span> <span class=\"token number\">0</span><span class=\"token punctuation\">;</span> i <span class=\"token operator\">&lt;</span> <span class=\"token number\">1000</span><span class=\"token punctuation\">;</span> i<span class=\"token operator\">++</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n            <span class=\"token class-name\">String</span> msg <span class=\"token operator\">=</span> <span class=\"token string\">\"log\"</span> <span class=\"token operator\">+</span> <span class=\"token string\">\" @ \"</span> <span class=\"token operator\">+</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">Date</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n            out<span class=\"token punctuation\">.</span><span class=\"token function\">write</span><span class=\"token punctuation\">(</span>msg<span class=\"token punctuation\">.</span><span class=\"token function\">getBytes</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n            out<span class=\"token punctuation\">.</span><span class=\"token function\">flush</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n          <span class=\"token punctuation\">}</span>\n          out<span class=\"token punctuation\">.</span><span class=\"token function\">close</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n        <span class=\"token keyword\">return</span> <span class=\"token keyword\">new</span> <span class=\"token class-name\">ResponseEntity</span><span class=\"token punctuation\">(</span>stream<span class=\"token punctuation\">,</span> <span class=\"token class-name\">HttpStatus</span><span class=\"token punctuation\">.</span>OK<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<p>需要注意有些反向代理有 buffer 设置，比如 nginx 的 <a href=\"https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffer_size\">proxy_buffer_size</a>，它会使得即便后端返回内容也需要等 buffer 满了才会真正返回前端，如果需要更实时的效果就需要关掉此功能。</p>\n<h2><a class=\"anchor\" name=\"%E8%87%AA%E5%8A%A8%E6%BB%9A%E5%8A%A8%E5%88%B0%E5%BA%95%E9%83%A8\" href=\"#%E8%87%AA%E5%8A%A8%E6%BB%9A%E5%8A%A8%E5%88%B0%E5%BA%95%E9%83%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>自动滚动到底部</h2><p>通过 <code>autoScroll</code> 可以关闭此功能</p>\n<h2><a class=\"anchor\" name=\"source-%E6%94%AF%E6%8C%81%E5%8F%98%E9%87%8F\" href=\"#source-%E6%94%AF%E6%8C%81%E5%8F%98%E9%87%8F\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>source 支持变量</h2><blockquote>\n<p>1.4.2 及以上版本</p>\n</blockquote>\n<p>可以初始设置为空，这样初始不会加载，而等这个变量有值的时候再加载</p>\n<pre><code class=\"language-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"form\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"body\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">[</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"label\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"数据源\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"select\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"name\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"source\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"options\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">[</span>\n        <span class=\"token punctuation\">{</span>\n          <span class=\"token property\">\"label\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"A\"</span><span class=\"token punctuation\">,</span>\n          <span class=\"token property\">\"value\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"http://localhost:3000/\"</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n        <span class=\"token punctuation\">{</span>\n          <span class=\"token property\">\"label\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"B\"</span><span class=\"token punctuation\">,</span>\n          <span class=\"token property\">\"value\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"http://localhost:4000/\"</span>\n        <span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">]</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"log\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"height\"</span><span class=\"token operator\">:</span> <span class=\"token number\">300</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"placeholder\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"请点击上面的数据源\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"source\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"${source | raw}\"</span>\n    <span class=\"token punctuation\">}</span>\n  <span class=\"token punctuation\">]</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<h2><a class=\"anchor\" name=\"source-%E6%94%AF%E6%8C%81%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE\" href=\"#source-%E6%94%AF%E6%8C%81%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>source 支持高级配置</h2><blockquote>\n<p>1.6.1 及以上版本</p>\n</blockquote>\n<p>可以类似 api 那样自定义 header、method 等，比如：</p>\n<pre><code class=\"language-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"log\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"height\"</span><span class=\"token operator\">:</span> <span class=\"token number\">300</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"source\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token property\">\"method\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"post\"</span><span class=\"token punctuation\">,</span>\n    <span class=\"token property\">\"url\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"[/api/mock2/form/saveForm](http://localhost:3000/)\"</span><span class=\"token punctuation\">,</span>\n    <span class=\"token property\">\"data\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"myName\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"${name}\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"myEmail\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"${email}\"</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token property\">\"headers\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"my-header\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"${myHeader}\"</span>\n    <span class=\"token punctuation\">}</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<h2><a class=\"anchor\" name=\"%E5%B1%9E%E6%80%A7%E8%A1%A8\" href=\"#%E5%B1%9E%E6%80%A7%E8%A1%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>属性表</h2><table>\n<thead>\n<tr>\n<th>属性名</th>\n<th>类型</th>\n<th>默认值</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>height</td>\n<td><code>number</code></td>\n<td>500</td>\n<td>展示区域高度</td>\n</tr>\n<tr>\n<td>className</td>\n<td><code>string</code></td>\n<td></td>\n<td>外层 CSS 类名</td>\n</tr>\n<tr>\n<td>autoScroll</td>\n<td><code>boolean</code></td>\n<td>true</td>\n<td>是否自动滚动</td>\n</tr>\n<tr>\n<td>placeholder</td>\n<td><code>string</code></td>\n<td></td>\n<td>加载中的文字</td>\n</tr>\n<tr>\n<td>encoding</td>\n<td><code>string</code></td>\n<td>utf-8</td>\n<td>返回内容的字符编码</td>\n</tr>\n<tr>\n<td>source</td>\n<td><code>string</code></td>\n<td></td>\n<td>接口</td>\n</tr>\n</tbody></table>\n</div>",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "基本用法",
          "fragment": "%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95",
          "fullPath": "#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95",
          "level": 2,
          "children": [
            {
              "label": "后端实现参考",
              "fragment": "%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%8F%82%E8%80%83",
              "fullPath": "#%E5%90%8E%E7%AB%AF%E5%AE%9E%E7%8E%B0%E5%8F%82%E8%80%83",
              "level": 3
            }
          ]
        },
        {
          "label": "自动滚动到底部",
          "fragment": "%E8%87%AA%E5%8A%A8%E6%BB%9A%E5%8A%A8%E5%88%B0%E5%BA%95%E9%83%A8",
          "fullPath": "#%E8%87%AA%E5%8A%A8%E6%BB%9A%E5%8A%A8%E5%88%B0%E5%BA%95%E9%83%A8",
          "level": 2
        },
        {
          "label": "source 支持变量",
          "fragment": "source-%E6%94%AF%E6%8C%81%E5%8F%98%E9%87%8F",
          "fullPath": "#source-%E6%94%AF%E6%8C%81%E5%8F%98%E9%87%8F",
          "level": 2
        },
        {
          "label": "source 支持高级配置",
          "fragment": "source-%E6%94%AF%E6%8C%81%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE",
          "fullPath": "#source-%E6%94%AF%E6%8C%81%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE",
          "level": 2
        },
        {
          "label": "属性表",
          "fragment": "%E5%B1%9E%E6%80%A7%E8%A1%A8",
          "fullPath": "#%E5%B1%9E%E6%80%A7%E8%A1%A8",
          "level": 2
        }
      ],
      "level": 0
    }
  };

});
