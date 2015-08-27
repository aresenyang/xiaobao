package com.hqgj.xb.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hqgj.xb.bean.Dictionary;
import com.hqgj.xb.bean.ExpenseAccount;
import com.hqgj.xb.bean.easyui.Grid;
import com.hqgj.xb.bean.easyui.Json;
import com.hqgj.xb.bean.easyui.Parameter;
import com.hqgj.xb.bean.easyui.SessionInfo;
import com.hqgj.xb.bean.highcharts.Charts;
import com.hqgj.xb.bean.highcharts.DiagramCharts;
import com.hqgj.xb.bean.highcharts.mixedgraph.MixedCharts;
import com.hqgj.xb.service.FinancialStatisticsService;

/**
 * @author 鲁宗豪
 * @datetime 2015年8月20日 下午10:19:34
 */
@Controller
@RequestMapping(value = "/securityJsp/page")
public class FinancialStatisticsController {
	@Autowired
	private FinancialStatisticsService financialStatisticsService;
	
	@RequestMapping(value = "/caiwu/addExpenseAccount", method = RequestMethod.POST)
	public @ResponseBody Json addExpenseAccount(ExpenseAccount expenseAccount,HttpServletRequest request) {
		Json json = new Json();
		SessionInfo sessionInfo = (SessionInfo) request.getSession().getAttribute("sessionInfo");
		expenseAccount.setDhandlerId(sessionInfo.getUser().getUserId());
		if (0 != financialStatisticsService.addExpenseAccount(expenseAccount)) {
			json.setSuccess(true);
		} else {
			json.setSuccess(false);
			json.setMsg("添加失败");
		}
		return json;
	}
	
	@RequestMapping(value = "/caiwu/updateExpenseAccount", method = RequestMethod.POST)
	public @ResponseBody Json updateExpenseAccount(ExpenseAccount expenseAccount) {
		Json json = new Json();
		if (-1 != financialStatisticsService.updateExpenseAccount(expenseAccount)) {
			json.setSuccess(true);
		} else {
			json.setSuccess(false);
			json.setMsg("修改信息失败");
		}
		return json;
	}
	@RequestMapping(value = "/caiwu/getExpenseAccountById", method = RequestMethod.POST)
	public @ResponseBody ExpenseAccount getExpenseAccountById(String id)
	{
		return financialStatisticsService.getExpenseAccountById(id);
	}
	
	@RequestMapping(value = "/caiwu/deleteExpenseAccount", method = RequestMethod.POST)
	public @ResponseBody Json deleteExpenseAccount(String id) {
		Json json = new Json();
		if (0 != financialStatisticsService.deleteExpenseAccount(id)) {
			json.setSuccess(true);
		} else {
			json.setSuccess(false);
			json.setMsg("删除失败");
		}
		return json;
	}
	
	
	@RequestMapping(value = "/caiwu/getExpenseAccount", method = RequestMethod.POST)
	public @ResponseBody Grid getExpenseAccount(ExpenseAccount expenseAccount, Parameter parameter ) {
		return financialStatisticsService.getExpenseAccount(expenseAccount, parameter);
	}
	
	@RequestMapping(value = "/caiwu/getAllExpenditure", method = RequestMethod.POST)
	public @ResponseBody List<Dictionary> getAllExpenditure(String type) {
		return financialStatisticsService.getAllExpenditure(type);
	}
	@RequestMapping(value = "/caiwu/getAllExpenditureProject", method = RequestMethod.POST)
	public @ResponseBody List<Dictionary> getAllExpenditureProject(String type)
	{
		return financialStatisticsService.getAllExpenditureProject(type);
	}
	
	//绘制混合图
	@RequestMapping(value = "/caiwu/getZhiChuAnDaLei", method = RequestMethod.POST)
	public @ResponseBody MixedCharts getZhiChuAnDaLei(String starttime,String endtime)
	{
		return financialStatisticsService.getZhiChuAnDaLei(starttime,endtime);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/caiwu/getLiuShuiZhang", method = RequestMethod.POST)
	public @ResponseBody Grid getLiuShuiZhang() {
		return financialStatisticsService.getLiuShuiZhang();
	}
	
	@RequestMapping(value = "/caiwu/getLiuShuiAnXiaoQu", method = RequestMethod.POST)
	public @ResponseBody Charts getLiuShuiAnXiaoQu(String starttime,String endtime) {
		return financialStatisticsService.getLiuShuiAnXiaoQu(starttime,endtime);
	}
	@RequestMapping(value = "/caiwu/getLiuShuiYueDuiBi", method = RequestMethod.POST)
	public @ResponseBody DiagramCharts getLiuShuiYueDuiBi(String statisticalYear) {
		return financialStatisticsService.getLiuShuiYueDuiBi(statisticalYear);
	}
	@RequestMapping(value = "/caiwu/getLiuShuiAnRenYuan", method = RequestMethod.POST)
	public @ResponseBody Charts getLiuShuiAnRenYuan(String starttime,String endtime) {
		return financialStatisticsService.getLiuShuiAnRenYuan(starttime,endtime);
	}
	
	@RequestMapping(value = "/caiwu/getTuiFeiAnXiaoQu", method = RequestMethod.POST)
	public @ResponseBody Charts getTuiFeiAnXiaoQu(String starttime,String endtime) {
		return financialStatisticsService.getTuiFeiAnXiaoQu(starttime,endtime);
	}
	@RequestMapping(value = "/caiwu/getXueFeiAnKeCheng", method = RequestMethod.POST)
	public @ResponseBody Charts getXueFeiAnKeCheng(String starttime,String endtime) {
		return financialStatisticsService.getXueFeiAnKeCheng(starttime,endtime);
	}
	@RequestMapping(value = "/caiwu/getTuiFeiAnKeCheng", method = RequestMethod.POST)
	public @ResponseBody Charts getTuiFeiAnKeCheng(String starttime,String endtime) {
		return financialStatisticsService.getTuiFeiAnKeCheng(starttime,endtime);
	}
	
}
