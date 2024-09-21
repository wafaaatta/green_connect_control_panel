import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Columns, Trash2, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import Loader from './Loaders';

type KeyType = string | string[];

interface Column<T> {
  key: KeyType;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  flex?: number;
  show?: boolean;
}


interface BulkActionItem {
  icon: React.ElementType;
  label: string;
  onClick: (selectedRows: unknown[]) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  actions?: (row: T) => React.ReactNode;
  bulkActions?: BulkActionItem[];
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  striped?: boolean;
  showColumnSelector?: boolean;
}

export function DataTable<T>({
  columns,
  data, 
  itemsPerPage = 10,
  actions,
  bulkActions,
  hoverable = false,
  loading = false,
  emptyMessage = 'No data available',
  striped = false,
  showColumnSelector = false
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<KeyType | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState(columns.filter(col => col.show !== false).map(col => col.key));
  const [showColumnSelectorDropdown, setShowColumnSelectorDropdown] = useState(false);
  const [showBulkActionsDropdown, setShowBulkActionsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSort = (column: KeyType) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getValue = useCallback((obj: unknown, key: KeyType): any => {
    if (typeof key === 'string') return obj[key];
    return key.reduce((acc, k) => acc && acc[k], obj);
  }, []);

  const sortedData = useMemo(() => {
    if (sortColumn) {
      return [...filteredData].sort((a, b) => {
        const aValue = getValue(a, sortColumn);
        const bValue = getValue(b, sortColumn);
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortColumn, sortDirection, getValue]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const toggleRowSelection = (index: number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleAllRows = () => {
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData.map((_, index) => startIndex + index)));
    }
  };

  const toggleColumnVisibility = (key: KeyType) => {
    setVisibleColumns(prev => {
      const stringKey = Array.isArray(key) ? key.join('.') : key;
      if (prev.includes(stringKey)) {
        return prev.filter(k => k !== stringKey);
      } else {
        return [...prev, stringKey];
      }
    });
  };

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(lowercasedSearchTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const EmptyState = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-900">{emptyMessage}</h3>
      </div>
    </div>
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => setCurrentPage(1)}
          className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="px-2 py-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 text-sm font-medium rounded-sm ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="px-2 py-1">...</span>);
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      );
    }

    return pageNumbers;
  };

  const renderRow = (row: T, index: number) => {
    const isSelected = selectedRows.has(index);

    return (
      <tr
        key={index}
        className={`${
          hoverable ? 'hover:bg-gray-50' : ''
        } ${striped && index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
          isSelected ? 'bg-blue-50' : ''
        }`}
      >
        <td className="px-4 py-3 whitespace-nowrap sticky left-0 z-10 bg-inherit">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleRowSelection(index)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        </td>
        {columns.filter(col => visibleColumns.includes(Array.isArray(col.key) ? col.key.join('.') : col.key)).map((column) => (
          <td
            key={Array.isArray(column.key) ? column.key.join('.') : column.key}
            className="px-4 py-3 whitespace-nowrap"
            style={{
              textAlign: column.align || 'left',
              flex: column.flex,
            }}
          >
            {column.render
              ? column.render(getValue(row, column.key), row)
              : getValue(row, column.key)}
          </td>
        ))}
        {actions && (
          <td className="px-4 py-3 whitespace-nowrap">
            {actions(row)}
          </td>
        )}
      </tr>
    );
  };

  return (
    <div className=" sm:rounded">
      <div className="bg-white py-3 flex flex-wrap items-center justify-between border-b border-gray-200 sticky top-0 z-20">
        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Table"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input block w-full sm:w-64 md:w-96 pl-8 pr-11 py-2 border border-gray-300 rounded-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {bulkActions && bulkActions.length > 0 && selectedRows.size > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowBulkActionsDropdown(!showBulkActionsDropdown)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Actions
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showBulkActionsDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded shadow border bg-white ring-1 ring-black ring-opacity-5 z-30">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {bulkActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          action.onClick(Array.from(selectedRows).map(index => currentData[index - startIndex]));
                          setShowBulkActionsDropdown(false);
                        }}
                      >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {showColumnSelector && (
            <div className="relative">
              <button
                onClick={() => setShowColumnSelectorDropdown(!showColumnSelectorDropdown)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none flex items-center"
              >
                <Columns className="w-4 h-4 mr-2" />
                Columns
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showColumnSelectorDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded shadow border bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {columns.map((column) => (
                      <div
                        key={Array.isArray(column.key) ? column.key.join('.') : column.key}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        onClick={() => toggleColumnVisibility(column.key)}
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(Array.isArray(column.key) ? column.key.join('.') : column.key)}
                          onChange={() => {}}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
                        />
                        <span className="flex-grow">{column.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-10 bg-gray-100">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === currentData.length}
                    onChange={toggleAllRows}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
              </th>
              {columns.filter(col => visibleColumns.includes(Array.isArray(col.key) ? col.key.join('.') : col.key)).map((column) => (
                <th
                  key={Array.isArray(column.key) ? column.key.join('.') : column.key}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center cursor-pointer">
                    {column.title}
                    {column.sortable && (
                      <span className="ml-1">
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <ChevronUp className="w-4 h-4 text-gray-300" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={visibleColumns.length + (actions ? 2 : 1)}>
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (actions ? 2 : 1)}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => renderRow(row, startIndex + index))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-white pt-3 flex items-center justify-between border-t border-gray-200 ">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
              <span className="font-medium">{sortedData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm space-x-1" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-1 rounded-l-md text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-1 rounded-r-md  text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}