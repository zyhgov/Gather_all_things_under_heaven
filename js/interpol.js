    const API_URL = "https://ws-public.interpol.int/notices/v1/red";
    let currentPage = 1;
    const ITEMS_PER_PAGE = 12; // 每页显示项目数

    function fetchNotices(page = 1) {
        const formData = $('#filter-form').serialize();
        $('#results').empty();
        $('#pagination').empty();
        $('#no-results').addClass('hidden');
        $('#loading').removeClass('hidden');

        // 构建API请求参数 
        const params = new URLSearchParams({
            page: page,
            resultPerPage: ITEMS_PER_PAGE,
            ...Object.fromEntries(new URLSearchParams(formData))
        });

        $.getJSON(`${API_URL}?${params}`, function(data) {
            $('#loading').addClass('hidden');

            // 解析分页元数据 
            const totalItems = data.total || 0;
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

            if (!data._embedded?.notices?.length) {
                $('#no-results').removeClass('hidden');
                return;
            }

            // 渲染结果卡片
            data._embedded.notices.forEach(notice => {
                const imageUrl = notice._links.thumbnail?.href || '/asset/car_img/icpo-not.jpg';
                $('#results').append(`
                    <div class="bg-white shadow rounded-2xl p-4 transition hover:shadow-lg">
                        <img src="${imageUrl}" alt="照片" class="w-full object-contain h-64 rounded mb-4 bg-gray-100" />
                        <h3 class="text-lg font-semibold mb-1">${notice.name || ''} ${notice.forename || ''}</h3>
                        <p class="text-sm text-gray-600">国籍: ${notice.nationalities?.join(', ') || '未知'}</p>
                        <p class="text-sm text-gray-600">性别: ${notice.sex_id || '国际刑警数据已加密'}</p>
                        <a href="#" data-url="${notice._links.self.href}" data-img="${imageUrl}" 
                           class="view-detail font-bold text-blue-600 text-sm  mt-2 inline-block hover:underline">
                           查看详情卡片 &rarr;
                        </a>
                    </div>
                `);
            });

            // 生成分页导航 
            if (totalPages > 1) {
                const pagination = $('#pagination');
                
                // 上一页按钮
                pagination.append(`
                    <button class="px-3 py-1 border rounded ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-blue-100'}" 
                            ${page === 1 ? 'disabled' : ''} 
                            onclick="fetchNotices(${page - 1})">
                        &laquo;
                    </button>
                `);

                // 页码按钮（显示最多5个页码）
                const startPage = Math.max(1, page - 2);
                const endPage = Math.min(totalPages, page + 2);
                
                for (let i = startPage; i <= endPage; i++) {
                    pagination.append(`
                        <button class="px-3 py-1 border rounded ${i === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-100'}" 
                                onclick="fetchNotices(${i})">
                            ${i}
                        </button>
                    `);
                }

                // 下一页按钮
                pagination.append(`
                    <button class="px-3 py-1 border rounded ${page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-blue-100'}" 
                            ${page === totalPages ? 'disabled' : ''} 
                            onclick="fetchNotices(${page + 1})">
                        &raquo;
                    </button>
                `);
            }
        }).fail(() => {
            $('#loading').addClass('hidden');
            $('#no-results').removeClass('hidden');
        });
    }

    function showDetailModal(url, imgUrl) {
      $('#detail-img').attr('src', imgUrl || '/asset/car_img/icpo-not.jpg');
      $('#detail-content').html('<div class="text-center py-6 text-gray-500">加载详情中...</div>');
      $('#detail-modal').fadeIn();

      $.getJSON(url, function (data) {
        const detailHtml = `
          <img src="/asset/icon_logo/icpo.png" alt="logo" class="h-16 mb-2" />
          <h2 class="text-xl font-semibold mb-2"><strong>姓名:</strong> ${data.name} ${data.forename}</h2>
          <p><strong>出生日期:</strong> ${data.date_of_birth || '未知'}</p>
          <p><strong>国籍:</strong> ${data.nationalities?.join(', ') || '未知'}</p>
          <p><strong>性别:</strong> ${data.sex_id || '未知'}</p>
          <p><strong>出生地:</strong> ${data.place_of_birth || '未知'}</p>
          <p><strong>语言:</strong> ${data.languages_spoken_ids?.join(', ') || '未知'}</p>
          <p><strong>罪名:</strong> ${data.arrest_warrants?.[0]?.charge || '未知'}</p>
        `;
        $('#detail-content').html(detailHtml);
      });
    }

    $('#filter-form').on('submit', function (e) {
      e.preventDefault();
      currentPage = 1;
      fetchNotices(currentPage);
    });

    $(document).ready(() => {
      fetchNotices(currentPage);
    });

    $('#results').on('click', '.view-detail', function (e) {
      e.preventDefault();
      const url = $(this).data('url');
      const img = $(this).data('img');
      showDetailModal(url, img);
    });

    $('#close-modal').on('click', function () {
      $('#detail-modal').fadeOut();
    });

    $('#detail-modal').on('click', function (e) {
      if (e.target === this) {
        $(this).fadeOut();
      }
    });
// 小屏幕检测 + 高斯模糊提示
function checkScreenSize() {
  const warning = document.getElementById('mobile-warning-wrapper');
  if (window.innerWidth < 600) {
    warning.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 禁止滚动
  } else {
    warning.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
