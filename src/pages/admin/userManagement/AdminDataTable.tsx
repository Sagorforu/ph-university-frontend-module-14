import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

type TTableData = Pick<TStudent, "fullName" | "email" | "contactNo">;

const AdminDataTable = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: adminData, isFetching } = useGetAllAdminsQuery([
    //     { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = adminData?.meta;

  const tableData = adminData?.data?.map(
    ({ _id, fullName, email, contactNo }) => ({
      key: _id,
      _id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/admin-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button onClick={showModal}>Block</Button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              Do you want to block this Admin???
            </Modal>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        showQuickJumper
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default AdminDataTable;
