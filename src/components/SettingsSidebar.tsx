import * as React from "react";
import { Drawer, FormControlLabel, Switch } from "@material-ui/core";

interface Props {
  sidebarOpen: boolean;
  showExplicit: boolean;
  toggleShowExplicit: Function,
  toggleSidebar: Function
}

const SettingsSidebar = (props: Props) => {
  const handleDrawerClose = () => {
    props.toggleSidebar();
  };

  const handleToggleSwitch = () => {
    props.toggleShowExplicit();
  };

  return (
    <div>
      <Drawer open={props.sidebarOpen} onClose={handleDrawerClose}>
        <FormControlLabel
          control={
            <Switch
              checked={props.showExplicit}
              onChange={handleToggleSwitch}
            />
          }
          labelPlacement="top"
          label="Show Explicit Albums"
        />
      </Drawer>
    </div>
  );
};

export default SettingsSidebar;
