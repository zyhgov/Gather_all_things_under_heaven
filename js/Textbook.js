$(document).ready(function() {
    $('#textbookTable').DataTable({
        "processing": true,          // 启用数据处理动画
        "ajax": {
            "url": "/asset/data/compressed_parsed_hierarchical_structure.json",  // 数据源路径
            "dataSrc": "",  // 数据源为空，以确保返回数据被正确映射
        },
        "columns": [
            {
                "data": "content.file", // 显示教科书名
                "render": function(data, type, row) {
                    return data;  // 直接返回文件名
                }
            },
            {
                "data": "path[1].name",  // 阶段
                "render": function(data, type, row) {
                    if ([4, 5].includes(row.path.length)) {
                        return row.path[1].name || ''; 
                    } else {
                        return ''; 
                    }
                }
            },
            {
                "data": "path[2].name",  // 科目
                "render": function(data, type, row) {
                    if ([4, 5].includes(row.path.length)) {
                        return row.path[2].name || ''; 
                    } else {
                        return ''; 
                    }
                }
            },
            {
                "data": "path[3].name",  // 版本
                "render": function(data, type, row) {
                    if ([4, 5].includes(row.path.length)) {
                        return row.path[3].name || ''; 
                    } else {
                        return ''; 
                    }
                }
            },
            {
                "data": null,  // 年级
                "render": function(data, type, row) {
                    // 判断 path 数组长度来确保年级字段存在
                    if (row.path.length > 4) {
                        return row.path[4].name || '';  // 如果存在年级信息，返回年级名称
                    } else {
                        return '';  // 如果没有年级信息，返回空字符串
                    }
                }
            },
            {
                "data": null,  // 超链接
                "render": function(data, type, row) {
                    // 确保拼接路径时包含 "ChinaTextbook-master"
                    let path = row.path.map(p => encodeURIComponent(p.name));
                    // 拼接完整的 URL
                    let fullUrl = `${row.main_domain}/${path.join('/')}/${encodeURIComponent(row.content.file)}`;
                    return `<a href="${fullUrl}" target="_blank" class="btn">查看</a>`;
                }
            }
        ],
        "paging": true,           // 启用分页
        "lengthChange": true,     // 启用改变每页显示的记录数
        "searching": true,        // 启用搜索框
        "ordering": true,         // 启用排序
        "info": true,             // 显示表格的分页信息
        "autoWidth": false,       // 禁用自动列宽
        "pageLength": 10,         // 默认每页显示 10 条
        "deferRender": true,      // 启用延迟渲染
        "stateSave": true,        // 保存用户状态（分页、搜索、排序等）
        "order": [[0, 'asc']],     // 默认按照教科书名升序排序
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Chinese.json"   
        }

    });

});