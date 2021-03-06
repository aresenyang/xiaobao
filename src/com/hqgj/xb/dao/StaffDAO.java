package com.hqgj.xb.dao;

import java.util.List;

import com.hqgj.xb.bean.Dictionary;
import com.hqgj.xb.bean.Staff;
import com.hqgj.xb.bean.User;
import com.hqgj.xb.bean.easyui.Grid;
import com.hqgj.xb.bean.easyui.Parameter;

/**
 * @author 鲁宗豪
 * @datetime 2015年8月7日 上午9:40:42
 */
public interface StaffDAO {

	public  List<Dictionary> getpoliticalStatus(String type);
	public  List<Dictionary> getpersonnelstatus(String type);
	public  List<Dictionary> getlaborRelations(String type);
	public  List<Dictionary> getsocialsecurityStatus(String type);
	
	
	public int createStaff(Staff staff,User user);
	public  Grid Getmianshiqi(Staff staff, Parameter parameter);
	public  List<Staff> getStaffTag(String type);
	public int deletemianshiqi(String userid);
	
	
	public int editStaff(Staff staff);
	public Staff getstaffByuserId(String userid);
	
	
	public Grid Getpeixunshiyong(Staff staff, Parameter parameter);
	public int deletepeixunshiyong(String userid);
	
	public Grid Getzhuanzhengshibai(Staff staff, Parameter parameter);
	public int deletezhuanzhengshibai(String userid);
	
	
	public Grid Getzhengshitingzhi(Staff staff, Parameter parameter);
	public int deletezhengshitingzhi(String userid);
	
	public Grid Getlizhijiepin(Staff staff, Parameter parameter);
	public int deletelizhijiepin(String userid);
	
	
	
	public Grid Getyuangongshengri(Staff staff, Parameter parameter);
}
