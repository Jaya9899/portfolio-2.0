/* Skill groups, rendered as chip lists on the Skills page. */

const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['C++', 'Python', 'GDScript', 'JavaScript'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    items: [
      'React',
      'PyTorch Geometric',
      'LangGraph',
      'Flask',
      'ROS2',
      'Gazebo',
      'OpenCV',
      'scikit-learn',
      'Godot Engine',
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    items: ['Git', 'VS Code', 'WSL/Ubuntu', 'Vite'],
  },
  {
    id: 'interests',
    title: 'Areas of Interest',
    items: ['Deep Learning', 'Autonomous Systems & Robotics', 'LLM Agents'],
  },
];

export default skillGroups;
