import { View, Text, Image, Platform, Pressable } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";

import Project from "./project";

function WithStyledProjects(Component) {
  return function WithLogging(props) {
    const style = { height: "75%" };
    return (
      <View style={style}>
        <Component {...props} />
      </View>
    );
  };
}

const ProjectWithStyle = WithStyledProjects(Project);

export default ProjectWithStyle;
