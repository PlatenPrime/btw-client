import { Sidebar } from 'flowbite-react';
import React from 'react';

const SidebarBTW = () => {
	return (
		<div className="w-fit">
  <Sidebar aria-label="Sidebar with multi-level dropdown example">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          href="#"
         
        >
          Dashboard
        </Sidebar.Item>
        <Sidebar.Collapse
          
          label="E-commerce"
        >
          <Sidebar.Item href="#">
            Products
          </Sidebar.Item>
        </Sidebar.Collapse>
        <Sidebar.Item
          href="#"
          
        >
          Inbox
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
         
        >
          Users
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
		 
        >
          Products
        </Sidebar.Item>
        <Sidebar.Item
          href="/rows"
          
        >
          Sign In
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
         
        >
          Sign Up
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
</div>
	);
};

export default SidebarBTW;