var cxw = cxw || {};

/**
 * 验证手机号是否合法
 */
$.extend($.fn.validatebox.defaults.rules, {
	fixLength : {
		validator : function(value, param) {
			return value.length == param[0];
		},
		message : '手机号长度为11位'
	}
});

/**
 * 扩展validatebox，添加新的验证功能
 * 
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {/* 验证两次密码是否一致功能 */
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});

/**
 * 扩展validatebox，添加两个时间验证
 * 
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.validatebox.defaults.rules, {
	notBigger : {
		validator : function(value, param) {
			return value >= $(param[0]).val();
		},
		message : '开始时间应小于结束时间'
	}
});

/**
 * 验证开始时间小于结束时间
 */
cxw.checkStartTimeBeforeEndTime = function(startTime, endTime) {
	if ($(startTime).datebox('getValue') <= $(endTime).datebox('getValue')) {
		return true;
	} else {
		return false;
	}
}

/**
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.panel.defaults, {
	onBeforeDestroy : function() {
		var frame = $('iframe', this);
		try {
			if (frame.length > 0) {
				for (var i = 0; i < frame.length; i++) {
					frame[i].src = '';
					frame[i].contentWindow.document.write('');
					frame[i].contentWindow.close();
				}
				frame.remove();
				if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
					try {
						CollectGarbage();
					} catch (e) {
					}
				}
			}
		} catch (e) {
		}
	}
});

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * 
 * 
 * @requires jQuery,EasyUI
 */
cxw.onMove = {
	onMove : function(left, top) {
		var l = left;
		var t = top;
		if (l < 1) {
			l = 1;
		}
		if (t < 1) {
			t = 1;
		}
		var width = parseInt($(this).parent().css('width')) + 14;
		var height = parseInt($(this).parent().css('height')) + 14;
		var right = l + width;
		var buttom = t + height;
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();
		if (right > browserWidth) {
			l = browserWidth - width;
		}
		if (buttom > browserHeight) {
			t = browserHeight - height;
		}
		$(this).parent().css({/* 修正面板位置 */
			left : l,
			top : t
		});
	}
};
$.extend($.fn.dialog.defaults, cxw.onMove);
$.extend($.fn.window.defaults, cxw.onMove);
$.extend($.fn.panel.defaults, cxw.onMove);

/**
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 * 
 * 
 * @requires jQuery,EasyUI
 */
cxw.onLoadError = {
	onLoadError : function(XMLHttpRequest) {
		if (parent.$ && parent.$.messager) {
			parent.$.messager.progress('close');
			parent.$.messager.alert('错误', XMLHttpRequest.responseText);
		} else {
			$.messager.progress('close');
			$.messager.alert('错误', XMLHttpRequest.responseText);
		}
	}
};
$.extend($.fn.datagrid.defaults, cxw.onLoadError);
$.extend($.fn.treegrid.defaults, cxw.onLoadError);
$.extend($.fn.tree.defaults, cxw.onLoadError);
$.extend($.fn.combogrid.defaults, cxw.onLoadError);
$.extend($.fn.combobox.defaults, cxw.onLoadError);
$.extend($.fn.form.defaults, cxw.onLoadError);

/**
 * 扩展combobox在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combobox.defaults, {
	onShowPanel : function() {
		var _options = $(this).combobox('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _value = $(this).combobox('textbox').val();
			var _combobox = $(this);
			if (_value.length > 0) {
				$.post(_options.url, {
					q : _value
				}, function(result) {
					if (result && result.length > 0) {
						_combobox.combobox('loadData', result);
					}
				}, 'json');
			}
		}
	},
	onHidePanel : function() {
		var _options = $(this).combobox('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combobox('getData');/* 下拉框所有选项 */
			var _value = $(this).combobox('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.valueField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combobox('setValue', '');
			}
		}
	}
});

/**
 * 扩展combogrid在自动补全模式时，检查用户输入的字符是否存在于下拉框中，如果不存在则清空用户输入
 * 
 * 
 * @requires jQuery,EasyUI
 */
$.extend($.fn.combogrid.defaults, {
	onShowPanel : function() {
		var _options = $(this).combogrid('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _value = $(this).combogrid('textbox').val();
			if (_value.length > 0) {
				$(this).combogrid('grid').datagrid("load", {
					q : _value
				});
			}
		}
	},
	onHidePanel : function() {
		var _options = $(this).combogrid('options');
		if (_options.mode == 'remote') {/* 如果是自动补全模式 */
			var _data = $(this).combogrid('grid').datagrid('getData').rows;/* 下拉框所有选项 */
			var _value = $(this).combogrid('getValue');/* 用户输入的值 */
			var _b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */
			for (var i = 0; i < _data.length; i++) {
				if (_data[i][_options.idField] == _value) {
					_b = true;
				}
			}
			if (!_b) {/* 如果在下拉列表中没找到用户输入的字符 */
				$(this).combogrid('setValue', '');
			}
		}
	}
});

/**
 * 扩展tree和combotree，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
cxw.loadFilter = {
	loadFilter : function(data, parent) {
		var opt = $(this).data().tree.options;
		var idField, textField, parentField;
		if (opt.parentField) {
			idField = opt.idField || 'id';
			textField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			var i, l, treeData = [], tmpMap = [];
			for (i = 0, l = data.length; i < l; i++) {
				tmpMap[data[i][idField]] = data[i];
			}
			for (i = 0, l = data.length; i < l; i++) {
				if (tmpMap[data[i][parentField]]
						&& data[i][idField] != data[i][parentField]) {
					if (!tmpMap[data[i][parentField]]['children'])
						tmpMap[data[i][parentField]]['children'] = [];
					data[i]['text'] = data[i][textField];
					tmpMap[data[i][parentField]]['children'].push(data[i]);
				} else {
					data[i]['text'] = data[i][textField];
					treeData.push(data[i]);
				}
			}
			return treeData;
		}
		return data;
	}
};
$.extend($.fn.combotree.defaults, cxw.loadFilter);
$.extend($.fn.tree.defaults, cxw.loadFilter);

/**
 * 扩展treegrid，使其支持平滑数据格式
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.extend($.fn.treegrid.defaults, {
	loadFilter : function(data, parentId) {
		var opt = $(this).data().treegrid.options;
		var idField, treeField, parentField;
		if (opt.parentField) {
			idField = opt.idField || 'id';
			treeField = opt.textField || 'text';
			parentField = opt.parentField || 'pid';
			var i, l, treeData = [], tmpMap = [];
			for (i = 0, l = data.length; i < l; i++) {
				tmpMap[data[i][idField]] = data[i];
			}
			for (i = 0, l = data.length; i < l; i++) {
				if (tmpMap[data[i][parentField]]
						&& data[i][idField] != data[i][parentField]) {
					if (!tmpMap[data[i][parentField]]['children'])
						tmpMap[data[i][parentField]]['children'] = [];
					data[i]['text'] = data[i][treeField];
					tmpMap[data[i][parentField]]['children'].push(data[i]);
				} else {
					data[i]['text'] = data[i][treeField];
					treeData.push(data[i]);
				}
			}
			return treeData;
		}
		return data;
	}
});

/**
 * 创建一个模式化的dialog
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 */
cxw.modalDialog = function(options) {
	var opts = $.extend({
		title : '&nbsp;',
		modal : true,
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
	if (options.url) {
		opts.content = '<iframe id="" src="'
				+ options.url
				+ '" allowTransparency="true" scrolling="auto" width="100%" height="98%" frameBorder="0" name=""></iframe>';
	}
	return $('<div id="dialog"/>').dialog(opts);
};

/**
 * 更换主题
 * 
 * @requires jQuery,EasyUI
 * @param themeName
 */
cxw.changeTheme = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName
			+ '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for (var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			try {
				$(ifr).contents().find('#easyuiTheme').attr('href', href);
			} catch (e) {
				try {
					ifr.contentWindow.document.getElementById('easyuiTheme').href = href;
				} catch (e) {
				}
			}
		}
	}

	cxw.cookie('easyuiTheme', themeName, {
		expires : 7
	});
};

/**
 * 滚动条
 * 
 * @requires jQuery,EasyUI
 */
cxw.progressBar = function(options) {
	if (typeof options == 'string') {
		if (options == 'close') {
			$('#cxwProgressBarDiv').dialog('destroy');
		}
	} else {
		if ($('#cxwProgressBarDiv').length < 1) {
			var opts = $
					.extend(
							{
								title : '&nbsp;',
								closable : false,
								width : 300,
								height : 60,
								modal : true,
								content : '<div id="cxwProgressBar" class="easyui-progressbar" data-options="value:0"></div>'
							}, options);
			$('<div id="cxwProgressBarDiv"/>').dialog(opts);
			$.parser.parse('#cxwProgressBarDiv');
		} else {
			$('#cxwProgressBarDiv').dialog('open');
		}
		if (options.value) {
			$('#cxwProgressBar').progressbar('setValue', options.value);
		}
	}
};
var cardview = $
		.extend(
				{},
				$.fn.datagrid.defaults.view,
				{
					renderRow : function(target, fields, frozen, rowIndex,
							rowData) {
						var cc = [];
						cc.push('<td colspan=' + fields.length
								+ ' style="padding:5px;border:0;">');
						if (!frozen) {
							cc
									.push('<img src="'
											+ cxw.contextPath
											+ rowData.image
											+ '" style="width:200px;height:200px;float:left">');
							cc.push('<div style="float:left;width:100px;">');
							for (var i = 0; i < fields.length; i++) {
								if (i == 2) {
									cc
											.push('<span style="height:80px;display:block">'
													+ fields[i] + '</span>');
								} else if (i == 0) {
									cc
											.push('<span style="visibility:hidden;height:20px;display:block">'
													+ fields[i] + '</span>');
								} else if (i == 7) {
									cc
											.push('<span style="height:40px;display:block;">'
													+ '</span>');
								} else {
									cc
											.push('<span style="height:20px;display:block">'
													+ fields[i] + '</span>');
								}
							}
							cc.push('</div>');
							cc.push('<div style="float:left;width:500px;">');
							for (var i = 0; i < fields.length; i++) {
								if (i == 2) {
									cc
											.push('<span style="height:80px;display:block">'
													+ rowData[fields[i]]
													+ '</span>');
								} else if (i == 0) {
									cc
											.push('<span style="visibility:hidden;height:20px;display:block">'
													+ rowData[fields[i]]
													+ '</span>');
								} else if (i == 7) {
									cc
											.push('<span style="height:40px;display:block;">'
													+ '</span>');
								} else {
									cc
											.push('<span style="height:20px;display:block">'
													+ rowData[fields[i]]
													+ '</span>');
								}
							}
							cc.push('</div>');
							cc.push('<div style="float:left;width:200px;">');
							for (var i = 0; i < fields.length; i++) {
								if (i == 2)
									cc
											.push('<span style="height:80px;display:block">'
													+ '</span>');
								else if (i == 7) {
									cc
											.push('<span style="height:20px;display:block">'
													+ fields[i] + '</span>');
									cc
											.push('<span style="height:20px;display:block">'
													+ '$'
													+ rowData[fields[i]]
													+ '</span>');
								} else {
									cc
											.push('<span style="height:20px;display:block">'
													+ '</span>');
								}
							}
							cc.push('</div>');
						}
						cc.push('</td>');
						return cc.join('');
					}
				});

/**
 * @author 崔兴伟
 * @date 2014-11-5 合并单元格扩展
 * @param {Object}
 *            jq
 * @param {Object}
 *            fields
 * @memberOf {TypeName}
 * @return {TypeName}
 * 
 */
$.extend($.fn.datagrid.methods, {
	autoMergeCells : function(jq, fields) {
		return jq.each(function() {
			var target = $(this);
			if (!fields) {
				fields = target.datagrid("getColumnFields");
			}
			var rows = target.datagrid("getRows");
			var i = 0, j = 0, temp = {};
			for (i; i < rows.length; i++) {
				var row = rows[i];
				j = 0;
				for (j; j < fields.length; j++) {
					var field = fields[j];
					var tf = temp[field];
					if (!tf) {
						tf = temp[field] = {};
						tf[row[field]] = [ i ];
					} else {
						var tfv = tf[row[field]];
						if (tfv) {
							tfv.push(i);
						} else {
							tfv = tf[row[field]] = [ i ];
						}
					}
				}
			}
			$.each(temp, function(field, colunm) {
				$.each(colunm, function() {
					var group = this;

					if (group.length > 1) {
						var before, after, megerIndex = group[0];
						for (var i = 0; i < group.length; i++) {
							before = group[i];
							after = group[i + 1];
							if (after && (after - before) == 1) {
								continue;
							}
							var rowspan = before - megerIndex + 1;
							if (rowspan > 1) {
								target.datagrid('mergeCells', {
									index : megerIndex,
									field : field,
									rowspan : rowspan
								});
							}
							if (after && (after - before) != 1) {
								megerIndex = after;
							}
						}
					}
				});
			});
		});
	}
});
