import React, { useContext, useState } from "react";
import { LoginContext } from "@site/src/theme/Root";
import Select from "react-dropdown-select";
import styles from "./styles.module.css";

const ProjectsBox = () => {
  const { projects, account } = useContext(LoginContext);
  const options = Object.keys(projects).map((v) => ({
    value: v,
    label: projects[v].name,
  }));
  const [currentProject, setCurrentProject] = useState([options[0]]);

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectTitle}>Infura API Key</div>
      {account && !!Object.keys(projects).length ? 
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
      /> : <div className={styles.selectProjects}>Connect your MetaMask wallet to start sending requests to your Infura API keys.</div>}
    </div>
  );
};

export default ProjectsBox;
