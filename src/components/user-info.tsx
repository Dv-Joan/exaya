import { Space, Avatar, Typography, Tag } from "antd";
import { useSession } from "next-auth/react";
import React from "react";
type UserInfoProps = {
  collapsed: boolean;
};

export default function UserInfo({ collapsed }: UserInfoProps) {
  const { data: session } = useSession();

  return (
    <Space wrap size={1} className="my-16 flex flex-col">
      <Avatar
        className=""
        size={collapsed ? 35 : 80}
        //TODO: Descomment this line when you have the user image
        // src={
        //   session?.user?.image ||
        //   "https://cdn-icons-png.flaticon.com/128/8509/8509694.png?ga=GA1.1.631442079.1696688262"
        // }
        src="https://randomuser.me/api/portraits/men/95.jpg"
      />

      {!collapsed && (
        <div className="flex flex-col items-center justify-center">
          <Typography.Text strong>
            {/*//TODO: Descomment this line when you have the user name            
            {session?.user?.name || "Usuario Default"} */}
            Santiago Vargas
          </Typography.Text>
          <Tag
            color={
              session?.user?.role === "admin"
                ? "gold-inverse"
                : session?.user?.role === "supervisor"
                ? "blue-inverse"
                : "green-inverse"
            }
            className="mt-1 rounded-full font-semibold lowercase"
          >
            {session?.user?.role || "usuario"}
          </Tag>
        </div>
      )}
    </Space>
  );
}
