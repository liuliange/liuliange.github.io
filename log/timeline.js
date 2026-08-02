(function () {
  var $timeline = document.getElementById('timeline')
  var $loading = document.querySelector('.timeline-loading')

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  function render(list) {
    if (!$timeline) return
    var html = ''
    list.forEach(function (item) {
      html += '<li class="timeline-item">'
      html += '  <div class="timeline-dot"></div>'
      html += '  <div class="timeline-date">' + escapeHtml(item.date) + '</div>'
      if (item.title) {
        html += '  <div class="timeline-title">' + escapeHtml(item.title) + '</div>'
      }
      html += '  <div class="timeline-content">' + escapeHtml(item.content) + '</div>'
      html += '</li>'
    })
    $timeline.innerHTML = html
    if ($loading) $loading.style.display = 'none'
  }

  function load() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', './data.json', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText)
            render((data && data.list) || [])
          } catch (e) {
            if ($loading) $loading.textContent = '数据解析失败'
          }
        } else {
          if ($loading) $loading.textContent = '加载失败'
        }
      }
    }
    xhr.send()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load)
  } else {
    load()
  }
})()
