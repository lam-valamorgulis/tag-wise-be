// import type { TableColumnsType, TableProps } from "antd";
// import { Button, Divider, Input, Spin, Table, Typography, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { apiCreateLibrary, apiSearchProperty } from "../../utils/axios";
// import SearchProperties, { SearchPropertyParam } from "./SearchProperties";

// interface Property {
//   key: string;
//   propertyId: string;
//   propertyName: string;
//   status?: string; // New field for status
// }

// const HqRule: React.FC = () => {
//   const [searchProperties, setSearchProperties] =
//     useState<SearchPropertyParam | null>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
//   const [libraryName, setLibraryName] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleSearchProperty = (searchData: SearchPropertyParam) => {
//     setSearchProperties(searchData);
//   };

//   useEffect(() => {
//     const fetchProperties = async () => {
//       if (!searchProperties) return;
//       setLoading(true);
//       try {
//         const response = await apiSearchProperty({
//           ...searchProperties,
//           propertyName: searchProperties.propertyName ?? "",
//         });

//         console.log("API Response:", response);

//         const formattedData =
//           response?.data?.map((item: Property) => ({
//             key: item.propertyId,
//             propertyId: item.propertyId,
//             propertyName: item.propertyName,
//             status: "Not Created", // Default status
//           })) ?? [];

//         setProperties(formattedData);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [searchProperties]);

//   // Table columns
//   const columns: TableColumnsType<Property> = [
//     {
//       title: "Property Name",
//       dataIndex: "propertyName",
//       key: "propertyName",
//       render: (text: string) => <a>{text}</a>,
//     },
//     {
//       title: "Library Created Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string) => (
//         <span style={{ color: status === "Created" ? "green" : "red" }}>
//           {status}
//         </span>
//       ),
//     },
//     {
//       title: "Dummy Column 1",
//       dataIndex: "dummy1",
//       key: "dummy1",
//       render: () => "Dummy Data 1",
//     },
//     {
//       title: "Dummy Column 2",
//       dataIndex: "dummy2",
//       key: "dummy2",
//       render: () => "Dummy Data 2",
//     },
//   ];

//   // Handle row selection
//   const rowSelection: TableProps<Property>["rowSelection"] = {
//     onChange: (selectedRowKeys: React.Key[], selectedRows: Property[]) => {
//       const selectedIds = selectedRows.map((row) => row.propertyId);
//       console.log("Selected Properties:", selectedRows);
//       setSelectedPropertyIds(selectedIds);
//     },
//   };

//   // Handle Create Library API call
//   const handleCreateLibrary = async () => {
//     if (selectedPropertyIds.length === 0 || !libraryName) {
//       message.error("Please select properties and enter a library name.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const response = await apiCreateLibrary({
//         propertyIds: selectedPropertyIds,
//         libraryName,
//       });

//       if (response.success) {
//         message.success("Library created successfully!");

//         // Update status in the table
//         setProperties((prevProperties) =>
//           prevProperties.map((property) =>
//             selectedPropertyIds.includes(property.propertyId)
//               ? { ...property, status: "Created" }
//               : property
//           )
//         );
//       } else {
//         message.error("Failed to create library.");
//       }
//     } catch (error) {
//       console.error("Error creating library:", error);
//       message.error("Server error. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Typography.Title level={4}>Bulk Create Library</Typography.Title>

//       {/* Search Input */}
//       <SearchProperties onSearch={handleSearchProperty} isSearching={loading} />

//       <Divider />

//       {/* Table with Loading Indicator */}
//       {loading ? (
//         <div className="flex items-center justify-center min-h-screen">
//           <Spin tip="Loading properties..." size="large" />
//         </div>
//       ) : (
//         <Table<Property>
//           rowSelection={{ type: "checkbox", ...rowSelection }}
//           columns={columns}
//           dataSource={properties}
//           pagination={false}
//         />
//       )}

//       {/* Library Name Input */}
//       <Input
//         placeholder="Enter Library Name"
//         value={libraryName}
//         onChange={(e) => setLibraryName(e.target.value)}
//         style={{ marginTop: "20px", marginBottom: "20px" }}
//       />

//       {/* Bulk Create Button */}
//       <Button type="primary" onClick={handleCreateLibrary} loading={submitting}>
//         Apply Library to Selected Properties
//       </Button>
//     </div>
//   );
// };

// export default HqRule;

import type { TableColumnsType, TableProps } from "antd";
import { Button, Divider, Input, Spin, Table, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { apiCreateLibrary, apiSearchProperty } from "../../utils/axios";
import SearchProperties, { SearchPropertyParam } from "./SearchProperties";

interface Property {
  key: string;
  propertyId: string;
  propertyName: string;
  status?: string; // New field for status
}

const HqRule: React.FC = () => {
  const [searchProperties, setSearchProperties] =
    useState<SearchPropertyParam | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const [libraryName, setLibraryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSearchProperty = (searchData: SearchPropertyParam) => {
    setSearchProperties(searchData);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      if (!searchProperties) return;
      setLoading(true);
      try {
        const response = await apiSearchProperty({
          ...searchProperties,
          propertyName: searchProperties.propertyName ?? "",
        });

        const formattedData =
          response?.data?.map((item: Property) => ({
            key: item.propertyId,
            propertyId: item.propertyId,
            propertyName: item.propertyName,
            status: "Not Created", // Default status
          })) ?? [];

        setProperties(formattedData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchProperties]);

  // Table columns
  const columns: TableColumnsType<Property> = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Library Created Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "Created" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Dummy Column 1",
      dataIndex: "dummy1",
      key: "dummy1",
      render: () => "Dummy Data 1",
    },
    {
      title: "Dummy Column 2",
      dataIndex: "dummy2",
      key: "dummy2",
      render: () => "Dummy Data 2",
    },
  ];

  // Handle row selection
  const rowSelection: TableProps<Property>["rowSelection"] = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: Property[]) => {
      const selectedIds = selectedRows.map((row) => row.propertyId);
      console.log("Selected Properties:", selectedRows);
      setSelectedPropertyIds(selectedIds);
    },
  };

  // Handle Create Library API call
  const handleCreateLibrary = async () => {
    if (selectedPropertyIds.length === 0 || !libraryName) {
      message.error("Please select properties and enter a library name.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiCreateLibrary({
        propertiesId: selectedPropertyIds,
        libraryName,
      });

      if (response) {
        message.success("Library created successfully!");

        // Update status in the table
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            selectedPropertyIds.includes(property.propertyId)
              ? { ...property, status: "Created" }
              : property
          )
        );
      } else {
        message.error("Failed to create library.");
      }
    } catch (error) {
      console.error("Error creating library:", error);
      message.error("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Bulk Create Library</Typography.Title>

      {/* Search Input */}
      <SearchProperties onSearch={handleSearchProperty} isSearching={loading} />

      <Divider />

      {/* Table with Loading Indicator */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spin tip="Loading properties..." size="large" />
        </div>
      ) : (
        <Table<Property>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={properties}
          pagination={false}
        />
      )}

      {/* Library Name Input */}
      <Input
        placeholder="Enter Library Name"
        value={libraryName}
        onChange={(e) => setLibraryName(e.target.value)}
        style={{ marginTop: "20px", marginBottom: "20px", width: "400px" }}
      />

      {/* Bulk Create Button */}
      <div>
        <Button
          type="primary"
          onClick={handleCreateLibrary}
          loading={submitting}
        >
          Apply Library to Selected Properties
        </Button>
      </div>
    </div>
  );
};

export default HqRule;
