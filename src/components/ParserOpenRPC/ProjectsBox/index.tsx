import React, { useState } from "react";
import Select from "react-dropdown-select";
import styles from "./styles.module.css";

export interface Project {
  id: string;
  userId: string;
  name: string;
  created: number;
  updated: number;
  deleted: boolean;
  settings: any;
  networks: {
    [key: string]: { subnets: number[] };
  };
  role: string;
}

export interface ProjectsBoxProps {
  projects: { [key: string]: Project };
}

const ProjectsBox = ({ projects }: ProjectsBoxProps) => {
  const options = Object.keys(projects).map((v) => ({
    value: v,
    label: projects[v].name,
  }));
  const [currentProject, setCurrentProject] = useState([options[0]]);

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectTitle}>Infura API Key</div>
      <Select
        className={styles.selectProjects}
        multi={false}
        placeholder="Key name"
        searchable={false}
        options={options}
        values={currentProject}
        onChange={(value) => setCurrentProject(value)}
        contentRenderer={({ state }) => {
          return (
            <div>
              {state.values.map((item) => (
                <div key={item.value}>
                  <div>{item.label}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          );
        }}
        dropdownRenderer={({ methods }) => {
          return (
            <div className={styles.selectDropdown}>
              {options.map((option) => (
                <div
                  key={option.value}
                  style={{ padding: "8px 16px" }}
                  onClick={() => methods.addItem(option)}
                >
                  <div>{option.label}</div>
                  <div>{option.value}</div>
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ProjectsBox;
