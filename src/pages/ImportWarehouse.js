import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Modal } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { Html5QrcodeScanner } from "html5-qrcode";
import toast from "react-hot-toast";

const ImportWarehouse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [nameWarehouse, setNameWarehouse] = useState("Chưa xác định kho");
  const [errorMessage, setErrorMessage] = useState("");

  const getWarehouseById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/warehouse/get-by-id/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Mã QR không hợp lệ");
          setIsModalVisible(true);
          throw new Error("Mã QR không hợp lệ, vui lòng thử lại.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      console.log(data);
      setNameWarehouse(data.name); // Cập nhật nameWarehouse với name từ API
      setErrorMessage(""); // Xóa thông báo lỗi nếu có
    } catch (error) {
      console.error("Failed to fetch warehouse data:", error);
      setErrorMessage(error.message);
      startQrCodeScanner(); // Tiếp tục quét QR khác
    }
  };

  const startQrCodeScanner = () => {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    html5QrCodeScanner.render(
      (data) => {
        setQrData(data);
        console.log("QR Data: ", data);
        getWarehouseById(data);
        html5QrCodeScanner.clear();
        setIsModalVisible(false);
      },
      (err) => {
        console.error("Error: ", err);
      }
    );
  };

  useEffect(() => {
    if (isModalVisible) {
      startQrCodeScanner();
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Tên hàng hóa",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "productionDate",
      key: "productionDate",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expirationDate",
      key: "expirationDate",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "remainingQuantity",
      key: "remainingQuantity",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
    },
  ];

  const data = [
    {
      key: "1",
      productName: "Rong biển sấy khô (SS)",
      productionDate: "07/04/2024",
      expirationDate: "18 tháng",
      supplier: "CTY TNHH Thực phẩm rong biển",
      quantity: 19,
      remainingQuantity: 19,
      unit: "Kg",
      total: 5,
    },
    {
      key: "2",
      productName: "Bột nghệ",
      productionDate: "03/06/2024",
      expirationDate: "12 tháng",
      supplier: "CTY TNHH Việt Thái Bình Dương",
      quantity: 12,
      remainingQuantity: 12,
      unit: "Kg",
      total: 1,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Khai báo thông tin kho</h2>
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <Button
                type="primary"
                icon={<QrcodeOutlined />}
                size="large"
                block
                onClick={showModal}
              >
                Quét
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <h2>Thông tin kho</h2>
          <div>Kho hàng: {nameWarehouse}</div>
        </Col>
      </Row>
      <h2>Thông tin hàng hóa</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Modal
        title="Quét mã QR"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => {
          const readerElement = document.getElementById("reader");
          if (readerElement) {
            readerElement.remove();
          }
        }}
      >
        <div id="reader" style={{ width: "100%" }}></div>
        {qrData ? <p>QR Data: {qrData}</p> : <p>Đang quét...</p>}
      </Modal>
    </div>
  );
};

export default ImportWarehouse;
