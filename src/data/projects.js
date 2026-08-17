/* Project data. `id` doubles as the URL slug for /projects/:projectId,
   so ProjectDetail can look a project up straight from useParams(). */

const projects = [
  {
    id: 'jurisnet',
    file: 'jurisnet.exe',
    title: 'JurisNet',
    tagline: 'Multi-agent RAG for Indian Civil Procedure Code compliance.',
    summary:
      "A multi-agent RAG system that automates Indian Civil Procedure Code compliance checks. " +
      "I led agent orchestration across a five-stage LangGraph pipeline and built a deterministic " +
      "boolean-lattice aggregator over hybrid retrieval. It placed Rank 1 in Round 1 of " +
      "IIT Kharagpur's Agentic RAG Hackathon 2026.",
    role: 'Agent orchestration and retrieval aggregation',
    timeline: '2026',
    status: 'Rank 1, Round 1 at IIT Kharagpur Agentic RAG Hackathon 2026',
    stack: ['LangGraph', 'RAG', 'Neo4j', 'Qdrant', 'BM25', 'Python'],
    detail: [
      "Compliance review under the Civil Procedure Code is the kind of task that breaks a single-prompt " +
      "system: the answer depends on several provisions at once, and a plausible-sounding miss is worse " +
      "than no answer. So the pipeline is split into five LangGraph stages, each with a narrow job and a " +
      "checkable output, rather than one agent asked to reason end to end.",

      "Retrieval is hybrid. A Neo4j graph carries the structural relationships between provisions, Qdrant " +
      "handles dense semantic search, and BM25 covers the exact statutory phrasing that embeddings tend to " +
      "blur. Each retriever votes, and the votes are combined by a deterministic boolean-lattice aggregator " +
      "instead of an LLM judge, so the same inputs always produce the same compliance verdict, which is the " +
      "property that makes the output worth showing a human.",
    ],
    highlights: [
      'Five-stage LangGraph pipeline with per-stage validation',
      'Deterministic boolean-lattice aggregator over hybrid retrieval',
      'Neo4j structural graph + Qdrant dense vectors + BM25 lexical search',
      'Reproducible verdicts, with no LLM in the final aggregation step',
    ],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/AkshayyVishnu/JurisNet' },
    ],
  },

  {
    id: 'vulnhgnn',
    file: 'vulnhgnn.exe',
    title: 'VulnHGNN',
    tagline: 'Self-healing vulnerability detection on heterogeneous graphs.',
    summary:
      'A self-healing vulnerability detector built on heterogeneous graph neural networks. ' +
      'It runs a multilabel classifier over LLVM IR call graphs to flag five CWE classes ' +
      '(476 / 119 / 190 / 191 / 369) and prototyped code for healing vulnerabilities.',
    role: 'Model design and LLVM IR graph pipeline',
    timeline: '2025 to 2026',
    status: 'Prototype',
    stack: ['PyTorch Geometric', 'LLVM', 'Flask', 'Python'],
    detail: [
      "Most vulnerability classifiers read source code as a flat token sequence, which throws away the thing " +
      "that actually matters: how values move between functions. VulnHGNN lowers the program to LLVM IR " +
      "first and builds a heterogeneous graph over it, so call edges, data-flow edges and control-flow edges " +
      "stay distinct node and edge types instead of collapsing into one adjacency matrix.",

      "The classifier is multilabel rather than binary, because a single function frequently carries more than " +
      "one weakness: it predicts CWE-476 (null dereference), 119 (buffer bounds), 190 and 191 (integer overflow " +
      "and wraparound) and 369 (divide by zero) independently. On top of detection there is a prototype healing " +
      "step that proposes a patch for the flagged node, served through a small Flask interface.",
    ],
    highlights: [
      'Heterogeneous GNN over LLVM IR call graphs (PyTorch Geometric)',
      'Multilabel head covering CWE-476 / 119 / 190 / 191 / 369',
      'Typed call, data-flow and control-flow edges kept separate',
      'Prototype self-healing step that proposes patches for flagged nodes',
    ],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/Jaya9899/VulnHGNN' },
    ],
  },

  {
    id: 'drone-autonomy',
    file: 'aerothon.exe',
    title: 'Autonomous Drone Software',
    tagline: 'ROS2 autonomy stack for SAE India Aerothon.',
    summary:
      "Part of the software and autonomy stack for a 10-member team in SAE India's drone challenge. " +
      'I built a ROS2 + Gazebo simulation with a BCD planner, plus OpenCV-based QR detection for target ID. ' +
      "I'm now integrating PPO-based RL for obstacle avoidance. The team was shortlisted in the top 30 of " +
      '400+ nationally.',
    role: 'Simulation, coverage planning and target detection',
    timeline: '2026, ongoing',
    status: 'Shortlisted top 30 of 400+ teams nationally',
    stack: ['ROS2 Humble', 'Gazebo', 'PX4', 'MAVROS', 'OpenCV', 'Python'],
    detail: [
      "Flying a real airframe to test a planner is slow and expensive, so the first thing I built was the " +
      "simulation: a Gazebo world wired to PX4 through MAVROS, running the same ROS2 nodes the physical drone " +
      "runs. Every planner change gets flown a few dozen times in simulation before it touches hardware.",

      "The search pattern uses boustrophedon cell decomposition: the survey area is split into cells the drone " +
      "can sweep in straight back-and-forth passes, which covers the ground fully without the overlap a naive " +
      "lawnmower path leaves behind. Targets are identified mid-flight by an OpenCV QR detector running on the " +
      "downward camera feed. The current work is replacing the reactive obstacle-avoidance layer with a PPO " +
      "policy trained in the same simulator.",
    ],
    highlights: [
      'ROS2 Humble + Gazebo + PX4/MAVROS simulation mirroring the real stack',
      'Boustrophedon cell decomposition planner for full-area coverage',
      'OpenCV QR detection on the downward camera for target identification',
      'In progress: PPO reinforcement learning for obstacle avoidance',
    ],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/Jaya9899/ros2-drone-automation' },
    ],
  },
];

/* Helper used by ProjectDetail so the page never has to know about the
   array's shape. It just asks for a slug and gets a project or undefined. */
export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

export default projects;
