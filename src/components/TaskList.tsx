import { useState } from "react";
import { styled } from "styled-components";
import { deleteTask, updateTask } from "../api/tasks";
import { Status, Task } from "../types/Task";
import { formatDate } from "../utils/helpers";

interface Props {
  tasks: Task[];
  fetchTasks: () => void;
}

export default function TaskList({ tasks, fetchTasks }: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleUpdateStatus = async (id: number, status: Status) => {
    await updateTask(id, { status });
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <TaskListContainer>
      <h1>Task List</h1>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort("title")}>
              Title{" "}
              {sortColumn === "title" && (sortDirection === "asc" ? "▲" : "▼")}
            </TableHeader>
            <TableHeader>Description</TableHeader>

            <TableHeader onClick={() => handleSort("status")}>
              Status{" "}
              {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
            </TableHeader>

            <TableHeader onClick={() => handleSort("dueDate")}>
              Due Date{" "}
              {sortColumn === "dueDate" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <StyledTableCell>{task.title}</StyledTableCell>
              <StyledTableCell>{task.description}</StyledTableCell>
              <StyledTableCell>
                <Tag backgroundColor={statusColorMap[task.status]}>
                  {task.status}
                </Tag>
              </StyledTableCell>
              <StyledTableCell>{formatDate(task.dueDate)}</StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TaskListContainer>
  );
}

const TaskListContainer = styled.div`
  padding: 24px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* The key property */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #f2f2f2;
  cursor: pointer;
  user-select: none;
  border: 2px solid #ddd; /* Add a 2px solid border */

  &:hover {
    background-color: #e2e2e2;
  }
`;

const ActionCell = styled.td`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid #ddd; /* Add a 2px solid border */
`;

const StyledTableCell = styled.td`
  padding: 1rem;
  border: 2px solid #ddd; /* A new component for standard cells */
`;

const statusColorMap: Record<Status, BackgroundColorKeys> = {
  [Status.Todo]: "#FEEF82",
  [Status.InProgress]: "#7ECBBC",
  [Status.Done]: "#3A48B2",
};

const bgHoverColorMap = {
  "#F03112": "#D0290D",
  "#7ECBBC": "#629E92",
  "#3A48B2": "#1A2684",
  "#FEEF82": "#EADF70",
};

type BackgroundColorKeys = keyof typeof bgHoverColorMap;

interface TagProps {
  backgroundColor: BackgroundColorKeys;
}

const Tag = styled.div<TagProps>`
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  width: fit-content;
  border-radius: 4px;
`;

interface ButtonProps {
  backgroundColor: BackgroundColorKeys;
}
// Modified Button styled component
const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => bgHoverColorMap[props.backgroundColor]};
  }
`;
