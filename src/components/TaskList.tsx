import { useState } from "react";
import { styled } from "styled-components";
import { deleteTask } from "../api/tasks";
import { Status, Task } from "../types/Task";
import { formatDateForList } from "../utils/helpers";
import { BackgroundColorKeys } from "../utils/style";
import { Button } from "./common/Buttons";

interface Props {
  tasks: Task[];
  fetchTasks: () => void;
  onTaskClick: (task: Task) => void;
}

export default function TaskList({ tasks, fetchTasks, onTaskClick }: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <StyledTableRow key={task.id} onClick={() => onTaskClick(task)}>
              <StyledTableCell>{task.title}</StyledTableCell>
              <StyledTableCell>{task.description}</StyledTableCell>
              <StyledTableCell>
                <Tag backgroundColor={statusColorMap[task.status]}>
                  {task.status}
                </Tag>
              </StyledTableCell>
              <StyledTableCell>
                {formatDateForList(task.dueDate)}
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  backgroundColor="var(--color-red-100)"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </TaskListContainer>
  );
}

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  border: 2px solid #ddd;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const StyledTableCell = styled.td`
  padding: 1rem;
  border: 2px solid #ddd;
`;

const StyledTableRow = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: #cbd2ff;
  }
`;

const statusColorMap: Record<Status, BackgroundColorKeys> = {
  [Status.Todo]: "var(--color-yellow-100)",
  [Status.InProgress]: "var(--color-green-100)",
  [Status.Done]: "var(--color-blue-100)",
};

interface TagProps {
  backgroundColor: BackgroundColorKeys;
}

const Tag = styled.div<TagProps>`
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  width: fit-content;
  border-radius: 4px;
`;
