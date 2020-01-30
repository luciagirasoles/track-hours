import React from "react";
import { fetchUserReport } from "../../services/fetchReports";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

export default function UsersReport() {
  const [userList, setUserList] = React.useState([]);
  const { SearchBar } = Search;

  React.useEffect(() => {
    async function getUserList() {
      const data = await fetchUserReport();
      setUserList(data);
    }
    getUserList();
  }, []);
  const options = {
    custom: true,
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: userList.length
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true
    },
    {
      dataField: "role",
      text: "Role",
      sort: true
    }
  ];

  return (
    <>
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <PaginationListStandalone {...paginationProps} />
            <ToolkitProvider
              keyField="id"
              columns={columns}
              data={userList}
              search
            >
              {toolkitprops => (
                <div>
                  <SearchBar {...toolkitprops.searchProps} />
                  <BootstrapTable
                    striped
                    hover
                    {...toolkitprops.baseProps}
                    {...paginationTableProps}
                  />
                </div>
              )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
          </div>
        )}
      </PaginationProvider>
    </>
  );
}
