const DEPTH_LABEL = {
  intuitive: "Intuitive",
  formal: "Formal",
  steps: "Step-by-Step",
};

const STAGE_TITLES = [
  "Grounding concepts against slide context",
  "Organizing a step-by-step explanation",
  "Surfacing assumptions and source references",
];

const SAMPLE = {
  name: "CS201_Queues.pdf",
  kind: "sample",
  sample: true,
};

const SAMPLE_QUESTION = "Why doesn't dequeue just shift every item one place left? What extra memory does the Week 04 lecture actually use?";

const STEPS = [
  {
    id: 1,
    title: "The queue contract",
    origin: "notes",
    confidence: 93,
    confidenceLabel: "High",
    assumption:
      "FIFO names the abstract behavior. It does not choose an array, a linked list, or a circular buffer.",
    source:
      "Slide 1 — “A queue is a first-in, first-out structure. The earliest item still waiting is the next to leave.”",
    warning: "",
    bodies: {
      steps:
        "A queue keeps arrival order. The item that has been waiting longest is the front, and it is the next one to leave. A new item always joins at the rear. The later slides change how this is stored. They do not change this rule.",
      intuitive:
        "Think of a line of people. The person who arrived first is served first. Someone new joins at the back. Everything else on these slides is just a way to store that line.",
      formal:
        "A queue is a first-in, first-out abstract type. Dequeue returns the earliest inserted item that is still present, and enqueue inserts at the rear. That statement fixes the order. It does not prescribe the representation or the complexity.",
    },
    simpler:
      "Think of a line of people. The person who arrived first is served first. Someone new joins at the back. Everything else on these slides is just a way to store that line.",
    analogy:
      "A print queue in a lab works the same way. The document sent first is the next one printed. A document sent just now waits at the back. A newer job does not jump the line.",
    analogyAssumption:
      "The print queue illustrates arrival order only. It does not show how the lecture stores front and rear in an array.",
    analogyConfidence: 84,
    analogyLabel: "Fair",
    analogyWarning: "",
  },
  {
    id: 2,
    title: "Where enqueue writes",
    origin: "notes",
    confidence: 86,
    confidenceLabel: "High",
    assumption:
      "The array is circular. Rear wraps to index 0 with modulo capacity instead of growing the array.",
    source:
      "Slide 2 — “Write the new item at rear, then advance rear. When rear passes the last slot, it wraps.”",
    warning: "",
    bodies: {
      steps:
        "Enqueue stores the new item at the rear index, then moves rear forward. On this circular buffer that move is rear = (rear + 1) mod capacity, so a write at the last slot continues at index 0. If size already equals capacity, the queue is full and the enqueue does not overwrite a live item.",
      intuitive:
        "A new item goes to the back. The back marker then steps forward. When that marker is already in the last slot, it hops back to the first slot. If there is no free slot, the new item is refused rather than covering someone who is still waiting.",
      formal:
        "Enqueue writes at rear and updates rear to (rear + 1) mod capacity. The write and the index update are both O(1). When size = capacity the operation fails. Week 04 does not resize in place.",
    },
    simpler:
      "A new item goes to the back. The back marker then steps forward. When that marker is already in the last slot, it hops back to the first slot. If there is no free slot, the new item is refused rather than covering someone who is still waiting.",
    analogy:
      "The back of the line is a cone on the floor. The new person stands at the cone, and you move the cone one place along a loop. If the loop is full, they do not stand on top of someone. They wait until a place opens.",
    analogyAssumption:
      "The cone stands in for the rear index, and the loop is the circular array. The analogy skips the modulo formula.",
    analogyConfidence: 80,
    analogyLabel: "Fair",
    analogyWarning: "",
  },
  {
    id: 3,
    title: "What dequeue costs",
    origin: "ai",
    confidence: 64,
    confidenceLabel: "Medium",
    assumption:
      "Dequeue is done by shifting every later item one slot toward index 0. Extra index memory is treated as unnecessary, so the cost is paid in time.",
    source:
      "Slide 3 — “Use front and rear indices. Do not move the other elements on dequeue.”",
    warning:
      "The slides do not describe a shift. This step filled that gap on its own.",
    bodies: {
      steps:
        "Dequeue takes the item at index 0, then shifts every later item one place left so the new front sits at index 0 again. No separate front index is kept. Each removal copies the rest of the queue, which is O(n), and the extra memory beyond the array is treated as none.",
      intuitive:
        "Take the first item off the list. Then slide every other item one place toward the start, so the next item becomes the first. This version does not remember a front marker. It spends its effort moving items.",
      formal:
        "The draft treats the representation as a linear array packed from index 0. Dequeue returns a[0] and then assigns a[i] = a[i + 1] for each remaining item. That is O(n) data movement. Auxiliary memory is treated as O(1) only because the front index is discarded. This is not the circular buffer on the surrounding slides.",
    },
    simpler:
      "Take the first item out. Then move every remaining item one spot forward, so the line starts in the same place again. No extra marker is stored. The time goes into moving items, not into remembering a position.",
    simplerCorrected:
      "Read the item at the front marker, then move that marker to the next place, wrapping around the end. Leave the other items where they are. You keep a front marker, a back marker, and a count. That extra memory is small and fixed. Moving every item forward is the slow version, and these slides do not do that.",
    analogy:
      "A coffee line is painted as squares on the pavement, and the counter is always the first square. When a customer leaves, everyone behind steps into the next square. There is no sign you can move. The time is spent shuffling people.",
    analogyAssumption:
      "The painted squares stand in for a shifting array. The lecture’s movable front index is the piece this picture leaves out, and the draft still assumes a shuffle.",
    analogyConfidence: 60,
    analogyLabel: "Medium",
    analogyWarning:
      "This analogy describes the draft’s shuffle, not the lecture’s movable front index.",
    analogyCorrected:
      "The counter does not make everyone shuffle forward. The person at the front leaves, and a small sign that says “front” moves to the next person. The front sign, the back sign, and a tally of how many people are waiting are the only extra things you track. Asking the whole line to shuffle is the slow version, and it is not the one in the lecture.",
    analogyAssumptionCorrected:
      "The signs stand in for front and rear. The tally stands in for size. The picture does not prove the modulo arithmetic.",
    analogyCorrectedConfidence: 70,
    analogyCorrectedLabel: "Medium",
    analogyCorrectedWarning:
      "An analogy leaves out the modulo arithmetic. Use it as a bridge, not a proof.",
    correction: {
      suggestion:
        "Make the space cost explicit. Keep the circular queue, and say that dequeue does not shift the array.",
      body:
        "Dequeue reads the item at front and then advances front with (front + 1) mod capacity. The other items stay where they are. The extra memory is the front index, the rear index, and a size counter: a constant amount, not a second copy of the queue. Shifting every item would be O(n), and Week 04 does not do that.",
      assumption:
        "The lecture uses a circular buffer. Dequeue is O(1). The extra memory is a constant number of indices, and that cost is stated explicitly.",
    },
  },
  {
    id: 4,
    title: "Empty and full are different",
    origin: "notes",
    confidence: 88,
    confidenceLabel: "High",
    assumption:
      "These slides tell empty from full with a size counter. They do not sacrifice a slot.",
    source: "Slide 4 — “Track size so empty and full stay distinct.”",
    warning: "",
    bodies: {
      steps:
        "After the indices wrap, front and rear can land on the same slot for two different reasons: there are no items, or there is no free slot. These slides keep a size counter. Empty means size is 0. Full means size equals capacity. Leaving one slot unused would also separate the two states, and this lecture does not do that.",
      intuitive:
        "The front marker and the back marker can land on the same place for two reasons: nobody is waiting, or every place is taken. The slides keep a count. Zero means empty. A count that matches the number of places means full.",
      formal:
        "With only front and rear, front = rear is true for both the empty state and the full state after wrap-around. Week 04 disambiguates with an integer size. Empty means size = 0. Full means size = capacity. The representation that leaves one cell empty is not the one these slides use.",
    },
    simpler:
      "The front marker and the back marker can land on the same place for two reasons: nobody is waiting, or every place is taken. The slides keep a count. Zero means empty. A count that matches the number of places means full.",
    analogy:
      "A host with a clicker counts the people in a waiting room. Two ropes marking the front and the back of the line can sit together both when the room is empty and when it is full. The clicker tells those apart. These slides use the clicker, not an empty chair left on purpose.",
    analogyAssumption:
      "The clicker is the size counter. An unused chair would be the sacrificed-slot method, which this lecture does not use.",
    analogyConfidence: 82,
    analogyLabel: "Fair",
    analogyWarning: "",
  },
  {
    id: 5,
    title: "Walking the live items",
    origin: "ai",
    confidence: 76,
    confidenceLabel: "Fair",
    assumption:
      "Slots behind the front marker may still hold old values until a later enqueue overwrites them. A walk of the live queue follows front and size, not the raw array from index 0.",
    source:
      "Slide 5 — a wrap-around figure with front near the end of the array and rear near the start.",
    warning: "",
    bodies: {
      steps:
        "The items in the queue are not always a neat block starting at index 0. Start at front and step forward with modulo until you have taken size items. Stop there. Slots you have already dequeued can still hold old values until a new enqueue overwrites them, so printing the whole array would show items that have already left.",
      intuitive:
        "Do not read the row from left to right and trust every box. Start at the front marker and count forward as many items as the size says, wrapping around the end if you need to. Boxes you have already served can still show an old item until someone new stands there.",
      formal:
        "The live range is the sequence that starts at front and steps (front + k) mod capacity for k from 0 to size − 1. Cells outside that range are not elements of the queue, even when they retain a stale value. An iteration from 0 to capacity − 1 is not a traversal of the abstract type.",
    },
    simpler:
      "Start at the front and count out as many items as the queue says it holds, wrapping around the end. Ignore the other boxes. They can still show an old item.",
    analogy:
      "After a customer leaves a round booth, their cup can sit there until the next person uses that seat. You would not count the cup as someone in line. Start at the front sign and count only the people the tally says are waiting.",
    analogyAssumption:
      "The leftover cup is a stale array value. Counting every cup would invent items the queue has already removed.",
    analogyConfidence: 74,
    analogyLabel: "Fair",
    analogyWarning: "",
  },
];

const ORIGIN_TEXT = {
  notes: "From your notes",
  ai: "AI-generated",
  you: "Revised by you",
};

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const liveRegion = document.getElementById("live");
const tabStrip = document.getElementById("tab-strip");
const tabBar = document.getElementById("tabbar");
const sideBar = document.getElementById("side");
const noteLibrary = document.getElementById("note-library");
const sideNotes = document.getElementById("side-notes");
const notesEmpty = document.getElementById("notes-empty");
const notesSideEmpty = document.getElementById("notes-side-empty");
const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");
const historyCount = document.getElementById("history-count");
const historySearch = document.getElementById("history-search");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file-input");
const fileError = document.getElementById("file-error");
const chooseBtn = document.getElementById("choose");
const removeBtn = document.getElementById("remove-file");
const chosenName = document.getElementById("chosen-name");
const chosenMeta = document.getElementById("chosen-meta");
const chosenExcerpt = document.getElementById("chosen-excerpt");
const buildBtn = document.getElementById("build");
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save");
const stepsEl = document.getElementById("steps");
const ownNote = document.getElementById("own-note");
const stepProgress = document.getElementById("step-progress");
const saveBar = document.getElementById("save-bar");
const stageEls = [...document.querySelectorAll(".stage")];
const depthButtons = [...document.querySelectorAll(".segment [data-depth]")];

let selectedDepth = "steps";
let builtDepth = "steps";
let material = null;
let locked = null;
let state = freshState();
let currentView = "workspace";
let runId = 0;
let forceRender = true;
let booted = false;
let savedSnapshot = "";
let unlockedThrough = 1;
let stepsFinished = false;
let questionPassed = true;
let startFresh = false;
let historyEntries = [];
let historyIndex = -1;
let historyQuery = "";
const TAB_TITLES = {
  learn: "Learning space",
  notes: "Saved notes",
  history: "History",
};
let place = "home";
let viewingStack = false;
let focusedStep = 0;
let tabs = [];
let activeTab = "";
const cards = new Map();

function freshState() {
  const next = {};
  STEPS.forEach((step) => {
    next[step.id] = { base: "original", skin: "none", inspect: false, flag: false, ask: "" };
  });
  return next;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function live(message) {
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 20);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function stageDelay() {
  return motionQuery.matches ? 450 : 1150;
}

function metaFor(item) {
  if (!item || item.sample || item.kind === "sample") {
    return "Sample lecture · Week 04 queues";
  }
  if (item.kind === "pasted") return "Pasted text · Queue processing · Week 04";
  return "Uploaded file · Queue processing · Week 04";
}

function parseHash() {
  if (location.hash === "#/preparing") return "preparing";
  if (location.hash === "#/explanation") return "explanation";
  return "workspace";
}

function show(view) {
  const next = view === "workspace" ? "#/" : `#/${view}`;
  if (location.hash !== next) {
    location.hash = next;
    return;
  }
  applyView(view);
}

function depthShown() {
  return currentView === "workspace" ? selectedDepth : builtDepth;
}

function syncChips() {}

function animateIn(node) {
  if (!node || motionQuery.matches) return;
  node.classList.remove("is-entering");
  void node.offsetWidth;
  node.classList.add("is-entering");
}

function paintLocked() {
  if (!locked) return;
  document.querySelectorAll(".js-file-name").forEach((node) => {
    node.textContent = locked.name;
  });
  document.querySelectorAll(".js-file-meta").forEach((node) => {
    node.textContent = metaFor(locked);
  });
}

function paintMaterial() {
  const hasFile = Boolean(material);
  dropzone.classList.toggle("has-file", hasFile);
  chooseBtn.textContent = hasFile ? "Replace file" : "+ Choose file";
  if (!hasFile) {
    chosenExcerpt.hidden = true;
    return;
  }
  chosenName.textContent = material.name;
  chosenMeta.textContent = metaFor(material);
  if (material.excerpt) {
    chosenExcerpt.hidden = false;
    chosenExcerpt.textContent = material.excerpt;
  } else {
    chosenExcerpt.hidden = true;
  }
}

function showError(message) {
  fileError.hidden = false;
  fileError.textContent = message;
}

function clearError() {
  fileError.hidden = true;
  fileError.textContent = "";
}

function acceptFile() {
  material = null;
  paintMaterial();
  showError("This is a demo. That file was not uploaded or read.");
  live("This is a demo. The file was not read.");
}

function setDepth(next) {
  selectedDepth = next;
  depthButtons.forEach((button) => {
    const on = button.dataset.depth === next;
    button.setAttribute("aria-checked", on ? "true" : "false");
    button.tabIndex = on ? 0 : -1;
  });
  syncChips();
  const current = depthButtons.find((button) => button.dataset.depth === next);
  current?.focus();
}

function paintStage(activeIndex) {
  stageEls.forEach((stage, index) => {
    stage.classList.remove("is-active", "is-done", "is-waiting");
    const title = stage.querySelector(".stage-title");
    const status = stage.querySelector(".stage-status");
    if (activeIndex === "done" || index < activeIndex) {
      stage.classList.add("is-done");
      title.textContent = STAGE_TITLES[index];
      status.textContent = "Done";
    } else if (index === activeIndex) {
      stage.classList.add("is-active");
      title.textContent = `${STAGE_TITLES[index]}...`;
      status.textContent = "In progress";
    } else {
      stage.classList.add("is-waiting");
      title.textContent = STAGE_TITLES[index];
      status.textContent = "Up next";
    }
  });
}

async function runPreparation(id) {
  for (let index = 0; index < STAGE_TITLES.length; index += 1) {
    if (id !== runId) return;
    paintStage(index);
    live(`In progress: ${STAGE_TITLES[index]}.`);
    await wait(stageDelay());
  }
  if (id !== runId) return;
  paintStage("done");
  await wait(motionQuery.matches ? 200 : 420);
  if (id !== runId) return;
  live("Explanation ready.");
  show("explanation");
}

function disallowed(text) {
  return /\b(grades?|graded|my scores?|my marks?|assignments?|homework|submit(?:-|\s)?ready|for submission|write (?:my|the) (?:assignment|essay|homework)|do my homework)\b/i.test(text)
    || /\b(grade|mark)s?\s+(my|this)\s+(work|assignment|answer)s?\b/i.test(text);
}

function getView(step, st) {
  const corrected = st.base === "corrected";
  const view = {
    title: step.title,
    source: step.source,
    origin: corrected ? "you" : step.origin,
    body: step.bodies[builtDepth] || step.bodies.steps,
    assumption: step.assumption,
    confidence: step.confidence,
    confidenceLabel: step.confidenceLabel,
    warning: "",
    note: "",
  };

  if (st.skin === "analogy") {
    if (corrected && step.analogyCorrected) {
      view.body = step.analogyCorrected;
      view.assumption = step.analogyAssumptionCorrected;
      view.confidence = step.analogyCorrectedConfidence;
      view.confidenceLabel = step.analogyCorrectedLabel;
      view.warning = step.analogyCorrectedWarning || "";
    } else if (corrected) {
      view.body = `${step.analogy}\n\nYour note still applies: ${st.ask}`;
      view.assumption = `Adjusted from your note: ${st.ask}`;
      view.confidence = step.analogyConfidence;
      view.confidenceLabel = step.analogyLabel;
      view.warning = step.analogyConfidence <= 70 ? step.analogyWarning || step.warning : "";
    } else {
      view.body = step.analogy;
      view.assumption = step.analogyAssumption;
      view.confidence = step.analogyConfidence;
      view.confidenceLabel = step.analogyLabel;
      view.warning = step.analogyConfidence <= 70 ? step.analogyWarning || "" : "";
    }
    view.note = "Analogy on this step only. The other steps were left as they were.";
  } else if (st.skin === "simpler") {
    if (corrected && step.simplerCorrected) {
      view.body = step.simplerCorrected;
      view.assumption = step.correction.assumption;
      view.confidence = 91;
      view.confidenceLabel = "High";
      view.warning = "";
    } else if (corrected) {
      view.body = `${step.bodies.intuitive}\n\nIncluded from your note: ${st.ask}`;
      view.assumption = `Adjusted from your note: ${st.ask}`;
      view.confidence = step.confidence;
      view.confidenceLabel = step.confidenceLabel;
      view.warning = step.confidence <= 70 ? step.warning : "";
    } else {
      view.body = step.simpler;
      view.assumption = step.assumption;
      view.confidence = step.confidence;
      view.confidenceLabel = step.confidenceLabel;
      view.warning = step.confidence <= 70 ? step.warning : "";
    }
    view.note = corrected
      ? "Plain-language version of this step only."
      : "Plain-language version of this step only. The assumption is unchanged.";
  } else if (corrected && step.correction) {
    view.body = step.correction.body;
    view.assumption = step.correction.assumption;
    view.confidence = 91;
    view.confidenceLabel = "High";
    view.warning = "";
    view.note = `Only this step was rewritten. You asked: ${st.ask}`;
  } else if (corrected) {
    view.body = `${step.bodies[builtDepth] || step.bodies.steps}\n\nIncluded from your note: ${st.ask}`;
    view.assumption = `Adjusted from your note: ${st.ask}`;
    view.confidence = step.confidence;
    view.confidenceLabel = step.confidenceLabel;
    view.warning = step.confidence <= 70 ? step.warning : "";
    view.note = "Only this step was rewritten. Draft confidence was not recalculated, and it is not a grade.";
  } else {
    view.warning = step.confidence <= 70 ? step.warning : "";
  }

  if (view.confidence > 70) view.warning = "";
  return view;
}

function signature() {
  return STEPS.map((step) => getView(step, state[step.id]).body).join("\n---\n");
}

function markDirty() {}

function stepPhase(id) {
  if (!questionPassed) return "locked";
  if (stepsFinished || id < unlockedThrough) return "open";
  if (id === unlockedThrough) return "current";
  return "locked";
}

function paintQuestion() {
  document.querySelectorAll(".js-question").forEach((node) => {
    node.textContent = SAMPLE_QUESTION;
  });
  const card = document.getElementById("question-card");
  const gate = document.getElementById("question-gate");
  if (!card || !gate) return;
  card.classList.toggle("is-current", !questionPassed);
  gate.hidden = questionPassed;
}

function syncProgress() {
  const showProgress = questionPassed && !stepsFinished;
  stepProgress.hidden = !showProgress;
  if (showProgress) stepProgress.textContent = `Step ${unlockedThrough} of ${STEPS.length}`;
  const deeperForm = document.getElementById("deeper-form");
  const showAsk = questionPassed && currentView === "explanation";
  if (deeperForm && deeperForm.hidden && showAsk) animateIn(deeperForm);
  if (deeperForm) deeperForm.hidden = !showAsk;
  const showSave = stepsFinished;
  if (saveBar.hidden && showSave) animateIn(saveBar);
  saveBar.hidden = !showSave;
  if (stepsFinished) {
    renderNotePicks();
    syncNoteTarget();
  }
  paintQuestion();
}

function refreshCards() {
  STEPS.forEach((step) => updateCard(step.id));
  syncProgress();
}

function updateCard(id) {
  const step = STEPS.find((item) => item.id === id);
  const st = state[id];
  const card = cards.get(id);
  const view = getView(step, st);
  const phase = stepPhase(id);
  const lockedStep = phase === "locked";

  card.root.classList.toggle("is-locked", lockedStep);
  card.root.classList.toggle("is-current", phase === "current");
  const tools = !lockedStep && focusedStep === id;
  card.badges.hidden = !tools;
  card.body.hidden = lockedStep;
  card.actions.hidden = !tools;
  card.gate.hidden = phase !== "current";
  card.gateHint.hidden = true;
  card.root.classList.toggle("is-focused", tools);
  card.lockNote.hidden = !lockedStep;
  card.lockNote.textContent = lockedStep
    ? (questionPassed
      ? `Opens after you continue from step ${id - 1}.`
      : "Opens after you continue from your question.")
    : "";

  card.body.textContent = view.body;
  card.note.hidden = lockedStep || !view.note;
  card.note.textContent = view.note;
  card.origin.className = `badge badge-${view.origin}`;
  card.origin.textContent = ORIGIN_TEXT[view.origin];
  card.skin.hidden = st.skin === "none";
  card.skin.textContent = st.skin === "analogy" ? "Analogy" : st.skin === "simpler" ? "Simplified" : "";
  card.root.classList.toggle("is-open", st.inspect);
  card.root.classList.toggle("is-revised", st.base === "corrected");

  card.inspect.hidden = lockedStep || !st.inspect;
  card.inspectBtn.setAttribute("aria-expanded", st.inspect ? "true" : "false");
  card.inspectBtn.setAttribute("aria-pressed", st.inspect ? "true" : "false");
  card.confValue.textContent = `${view.confidenceLabel} · ${view.confidence}%`;
  card.meter.classList.toggle("is-low", view.confidence <= 70);
  card.meter.setAttribute("aria-valuenow", String(view.confidence));
  card.meter.setAttribute("aria-valuetext", `${view.confidenceLabel}, ${view.confidence} percent. This describes the draft, not you.`);
  card.meterFill.style.width = `${view.confidence}%`;
  card.warning.hidden = !view.warning;
  card.warning.textContent = view.warning;
  card.assumption.textContent = view.assumption;
  card.source.textContent = view.source;

  const showForm = !lockedStep && st.flag;
  
  card.root.classList.toggle("is-flag-open", showForm);
  
  if (showForm) {
    card.form.classList.remove("is-closing");
    card.form.hidden = false;
  } else if (!card.form.hidden) {
    card.form.classList.add("is-closing");
    setTimeout(() => {
      if (!state[id].flag || stepPhase(id) === "locked") {
        card.form.hidden = true;
        card.form.classList.remove("is-closing");
      }
    }, 250); 
  }
  card.flagBtn.setAttribute("aria-expanded", st.flag ? "true" : "false");
  card.flagBtn.setAttribute("aria-pressed", st.flag ? "true" : "false");
  card.simpleBtn.setAttribute("aria-pressed", st.skin === "simpler" ? "true" : "false");
  card.analogyBtn.setAttribute("aria-pressed", st.skin === "analogy" ? "true" : "false");
  card.restoreBtn.hidden = st.base === "original" && st.skin === "none";
  if (step.id < STEPS.length) {
    card.continueBtn.textContent = `Continue to step ${step.id + 1}`;
    card.gateHint.textContent = "The next step stays closed until you continue.";
  } else {
    card.continueBtn.textContent = "Finish";
  }
}

function buildCard(step) {
  const root = el("li", "step is-entering");
  root.dataset.id = String(step.id);

  const top = el("div", "step-top");
  const index = el("p", "step-index", `Step ${step.id}`);
  const badges = el("div", "badges");
  const origin = el("span", "badge");
  const skin = el("span", "badge badge-skin");
  skin.hidden = true;
  badges.append(origin, skin);
  top.append(index, badges);

  const title = el("h3", "step-title", step.title);
  const body = el("p", "step-body");
  const note = el("p", "step-note");
  note.hidden = true;

  const actions = el("div", "step-actions");
  const inspectBtn = actionButton("Inspect", "inspect");
  const flagBtn = actionButton("Flag as incorrect", "flag");
  const simpleBtn = actionButton("Too advanced", "simpler");
  const analogyBtn = actionButton("Use an analogy", "analogy");
  const restoreBtn = actionButton("Restore original", "restore");
  restoreBtn.classList.add("is-restore");
  restoreBtn.hidden = true;
  actions.append(inspectBtn, flagBtn, simpleBtn, analogyBtn, restoreBtn);

  const gate = el("div", "step-gate");
  const continueBtn = actionButton("Continue", "continue");
  continueBtn.className = "btn-primary btn-small";
  const gateHint = el("p", "hint");
  gate.append(continueBtn, gateHint);
  const lockNote = el("p", "lock-note");
  lockNote.hidden = true;

  const inspect = el("div", "inspect");
  inspect.id = `inspect-${step.id}`;
  inspect.hidden = true;
  inspect.setAttribute("role", "region");
  inspect.setAttribute("aria-label", `Inspection for step ${step.id}`);
  const confKicker = el("p", "kicker", "Draft confidence");
  const confValue = el("p", "conf-value");
  const meter = el("div", "meter");
  meter.setAttribute("role", "meter");
  meter.setAttribute("aria-valuemin", "0");
  meter.setAttribute("aria-valuemax", "100");
  meter.setAttribute("aria-label", "Draft confidence");
  const meterFill = el("span");
  meter.append(meterFill);
  const hint = el("p", "hint", "This describes the draft, not you.");
  const warning = el("p", "warn");
  warning.hidden = true;
  const assumeKicker = el("p", "kicker", "Assumption");
  const assumption = el("p", "inspect-copy");
  const sourceKicker = el("p", "kicker", "Source context");
  const source = document.createElement("blockquote");
  inspect.append(confKicker, confValue, meter, hint, warning, assumeKicker, assumption, sourceKicker, source);
  inspectBtn.setAttribute("aria-controls", inspect.id);

  const form = document.createElement("form");
  form.className = "flag-form";
  form.hidden = true;
  form.id = `flag-${step.id}`;
  const label = el("label", null, "What should this step make explicit?");
  const areaId = `ask-${step.id}`;
  label.htmlFor = areaId;
  const help = el("p", "hint", "The rewrite stays on this step.");
  const area = document.createElement("textarea");
  area.id = areaId;
  area.rows = 3;
  area.placeholder = step.correction
    ? step.correction.suggestion
    : "Say what this step should make clearer.";
  const error = el("p", "form-error");
  error.hidden = true;
  error.setAttribute("role", "alert");
  const row = el("div", "form-row");
  const apply = document.createElement("button");
  apply.type = "submit";
  apply.className = "btn-primary btn-small";
  apply.textContent = "Apply to this step";
  const close = actionButton("Close", "close-flag");
  row.append(apply, close);
  form.append(label, help, area, error, row);
  flagBtn.setAttribute("aria-controls", form.id);

  root.append(top, title, body, note, actions, inspect, form, gate, lockNote);
  cards.set(step.id, {
    root, badges, origin, skin, body, note, actions, inspectBtn, flagBtn, simpleBtn, analogyBtn, restoreBtn,
    inspect, form, area, error, confValue, meter, meterFill, warning, assumption, source,
    gate, continueBtn, gateHint, lockNote,
  });
  return root;
}

function actionButton(text, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;
  button.textContent = text;
  return button;
}

function mountExplanation(fresh) {
  cards.clear();
  if (fresh) {
    state = freshState();
    questionPassed = true;
    unlockedThrough = 1;
    stepsFinished = false;
    historyEntries = [];
    historyIndex = -1;
  } else {
    const entry = historyEntries[historyIndex] ?? historyEntries.at(-1);
    if (entry) applyTrail(entry);
  }
  stepsEl.replaceChildren();
  STEPS.forEach((step) => stepsEl.append(buildCard(step)));
  focusedStep = stepsFinished ? STEPS.length : questionPassed ? unlockedThrough : 0;
  refreshCards();
  renderNotePicks();
  ownNote.hidden = !locked || locked.sample !== false;
  paintLocked();
  if (fresh) pushHistory("Started this explanation");
  else renderHistory();
}

function applyView(view) {
  const previous = currentView;
  currentView = view;
  syncChips();
  paintLocked();
  paintQuestion();
  syncShell();

  if (view === "preparing") {
    const id = ++runId;
    runPreparation(id);
  } else if (previous === "preparing") {
    runId += 1;
  }

  if (view === "explanation") {
    if (!locked) locked = { ...SAMPLE };
    if (startFresh || forceRender || stepsEl.childElementCount === 0) {
      mountExplanation(startFresh || historyEntries.length === 0);
      forceRender = false;
      startFresh = false;
    }
    syncShell();
  }

  if (booted) {
    const stack = stackOpen() ? activeTabRecord() : null;
    const pageHeading = stack?.kind === "deeper"
      ? "deeper-title"
      : place === "notes"
        ? "notes-page-title"
        : place === "history"
          ? "history-page-title"
          : view === "explanation"
            ? "explain-title"
            : "";
    const heading = pageHeading ? document.getElementById(pageHeading) : document.querySelector(`#${view} h1`);
    if (heading && !heading.hidden && heading.offsetParent) heading.focus();
  }
  booted = true;
}

chooseBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.click();
});

dropzone.addEventListener("click", (event) => {
  if (event.target.closest("[data-stop], #choose")) return;
  fileInput.click();
});

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.classList.add("is-dragover");
});

dropzone.addEventListener("dragleave", () => dropzone.classList.remove("is-dragover"));

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("is-dragover");
  const file = event.dataTransfer?.files?.[0];
  if (file) acceptFile(file);
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  fileInput.value = "";
  if (file) acceptFile(file);
});

removeBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  material = null;
  clearError();
  paintMaterial();
  live("Removed the file.");
});

window.addEventListener("paste", (event) => {
  if (currentView !== "workspace") return;
  if (event.target.closest("textarea, input")) return;
  const file = event.clipboardData?.files?.[0];
  if (file) {
    event.preventDefault();
    acceptFile(file);
    return;
  }
  const text = event.clipboardData?.getData("text")?.trim();
  if (!text) return;
  event.preventDefault();
  material = null;
  paintMaterial();
  showError("This is a demo. Pasted notes are not read.");
  live("This is a demo. Pasted notes were not read.");
});

depthButtons.forEach((button) => {
  button.addEventListener("click", () => setDepth(button.dataset.depth));
});

document.querySelector(".segment").addEventListener("keydown", (event) => {
  const order = ["intuitive", "formal", "steps"];
  const index = order.indexOf(selectedDepth);
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    setDepth(order[(index + 1) % order.length]);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    setDepth(order[(index + order.length - 1) % order.length]);
  }
});

document.getElementById("question-continue").addEventListener("click", () => {
  if (questionPassed) return;
  questionPassed = true;
  focusedStep = 1;
  refreshCards();
  animateIn(cards.get(1)?.root);
  syncShell();
  pushHistory("Opened the answer");
  live("The answer is open, starting at step 1.");
  cards.get(1)?.root.scrollIntoView({
    behavior: motionQuery.matches ? "auto" : "smooth",
    block: "center",
  });
});

buildBtn.addEventListener("click", () => {
  state = freshState();
  savedSnapshot = "";
  startFresh = true;
  clearHistory();
  locked = material ? { ...material } : { ...SAMPLE };
  builtDepth = selectedDepth;
  forceRender = true;
  if (!material) live("Using the CS201 queues sample.");
  show("preparing");
});

cancelBtn.addEventListener("click", () => {
  live("Preparation cancelled.");
  show("workspace");
});

stepsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    const card = event.target.closest(".step");
    if (!card || event.target.closest("form, textarea, a")) return;
    const id = Number(card.dataset.id);
    if (stepPhase(id) === "locked" || focusedStep === id) return;
    focusedStep = id;
    refreshCards();
    return;
  }
  const card = button.closest(".step");
  const id = Number(card.dataset.id);
  const step = STEPS.find((item) => item.id === id);
  const st = state[id];
  const action = button.dataset.action;
  if (stepPhase(id) === "locked") return;

  if (action === "continue") {
    if (stepPhase(id) !== "current") return;
    if (id < STEPS.length) {
      unlockedThrough = id + 1;
      focusedStep = unlockedThrough;
      refreshCards();
      animateIn(cards.get(unlockedThrough).root);
      pushHistory(`Opened step ${unlockedThrough}`);
      live(`Step ${unlockedThrough} of ${STEPS.length} is open.`);
      cards.get(unlockedThrough).root.scrollIntoView({
        behavior: motionQuery.matches ? "auto" : "smooth",
        block: "center",
      });
    } else {
      stepsFinished = true;
      focusedStep = id;
      refreshCards();
      pushHistory("Finished the steps");
      live("All steps are open. You can save these notes.");
      saveBar.scrollIntoView({
        behavior: motionQuery.matches ? "auto" : "smooth",
        block: "nearest",
      });
    }
    return;
  }

  if (action === "inspect") st.inspect = !st.inspect;
  if (action === "flag") {
    st.flag = !st.flag;
    const cardRefs = cards.get(id);
    if (st.flag && !cardRefs.area.value && step.correction) {
      cardRefs.area.value = step.correction.suggestion;
    }
    if (st.flag) {
      cardRefs.error.hidden = true;
      window.setTimeout(() => cardRefs.area.focus(), 0);
    }
  }
  if (action === "close-flag") st.flag = false;
  if (action === "simpler") st.skin = st.skin === "simpler" ? "none" : "simpler";
  if (action === "analogy") st.skin = st.skin === "analogy" ? "none" : "analogy";
  if (action === "restore") {
    st.base = "original";
    st.skin = "none";
    st.ask = "";
    st.flag = false;
  }

  updateCard(id);
  markDirty();
  if (action === "simpler") {
    pushHistory(st.skin === "simpler" ? `Simplified step ${id}` : `Brought back the wording on step ${id}`);
  } else if (action === "analogy") {
    pushHistory(st.skin === "analogy" ? `Used an analogy on step ${id}` : `Removed the analogy on step ${id}`);
  } else if (action === "restore") {
    pushHistory(`Restored step ${id}`);
  }
});

stepsEl.addEventListener("submit", (event) => {
  const form = event.target.closest(".flag-form");
  if (!form) return;
  event.preventDefault();
  const card = form.closest(".step");
  const id = Number(card.dataset.id);
  const step = STEPS.find((item) => item.id === id);
  const st = state[id];
  const cardRefs = cards.get(id);
  const ask = cardRefs.area.value.trim();

  if (!ask) {
    cardRefs.error.hidden = false;
    cardRefs.error.textContent = "Say what this step should change.";
    return;
  }
  if (disallowed(ask)) {
    const message = "InsightCoach can't grade work or write something to submit. Say what this step should make clearer, and only this step will change.";
    cardRefs.error.hidden = false;
    cardRefs.error.textContent = message;
    live(message);
    return;
  }

  cardRefs.error.hidden = true;
  st.ask = ask;
  st.base = "corrected";
  st.skin = "none";
  st.flag = false;
  st.inspect = true;
  updateCard(id);
  markDirty();
  pushHistory(`Rewrote step ${id}`);
  live(`Rewrote step ${id} only.`);
});

const NOTES_KEY = "insightcoach-notes";
const HISTORY_KEY = "insightcoach-history";
const noteName = document.getElementById("note-name");
const noteError = document.getElementById("note-error");
const noteQuestion = document.getElementById("note-include-question");
const notePicks = document.getElementById("note-step-picks");
const noteWhere = document.getElementById("note-where");
const noteNewFields = document.getElementById("note-new-fields");
const noteExistingFields = document.getElementById("note-existing-fields");
const notePick = document.getElementById("note-pick");
const noteTargetEmpty = document.getElementById("note-target-empty");

function loadNotes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistNotes(notes, prefer) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  fillNoteTargets(prefer);
}

function renderNotePicks() {
  const previous = new Map(
    [...notePicks.querySelectorAll("input")].map((input) => [input.value, input.checked])
  );
  notePicks.replaceChildren();
  STEPS.forEach((step) => {
    const view = getView(step, state[step.id]);
    const label = el("label", "pick");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = String(step.id);
    input.checked = previous.has(String(step.id)) ? previous.get(String(step.id)) : true;
    label.append(input, el("span", null, `Step ${step.id}. ${view.title}`));
    notePicks.append(label);
  });
}

function activeTabRecord() {
  return tabs.find((item) => item.id === activeTab) || null;
}

function stackOpen() {
  return viewingStack && Boolean(activeTabRecord());
}

function persistTabs() {
  localStorage.setItem("insightcoach-tabs", JSON.stringify({ tabs, activeTab, place, viewingStack }));
}

function loadTabs() {
  try {
    const parsed = JSON.parse(localStorage.getItem("insightcoach-tabs") || "null");
    if (!parsed || !Array.isArray(parsed.tabs)) return;
    tabs = parsed.tabs.filter((tab) => tab.kind === "note" || tab.kind === "deeper" || tab.kind === "explanation").map((tab) => ({
      id: String(tab.id),
      kind: tab.kind,
      title: String(tab.title || tab.noteName || tab.ask || "Tab"),
      noteName: tab.noteName || "",
      ask: tab.ask || "",
      sections: Array.isArray(tab.sections) ? tab.sections : [],
    }));
    const previous = parsed.tabs.find((tab) => tab.id === parsed.activeTab);
    const stacked = previous && (previous.kind === "note" || previous.kind === "deeper" || previous.kind === "explanation");
    if (parsed.place === "notes" || parsed.place === "history" || parsed.place === "learn") place = parsed.place;
    else if (previous?.kind === "notes" || previous?.kind === "note") place = "notes";
    else if (previous?.kind === "history") place = "history";
    if (tabs.some((tab) => tab.id === parsed.activeTab)) activeTab = parsed.activeTab;
    viewingStack = Boolean(activeTab) && stacked && (parsed.viewingStack === true || parsed.viewingStack == null);
    if (viewingStack) place = previous.kind === "note" ? "notes" : "learn";
  } catch {
    tabs = [];
    activeTab = "";
    place = "home";
    viewingStack = false;
  }
}

function pruneNoteTabs() {
  const names = new Set(loadNotes().map((note) => note.name));
  tabs = tabs.filter((tab) => tab.kind !== "note" || names.has(tab.noteName));
  if (activeTab && !tabs.some((tab) => tab.id === activeTab)) {
    activeTab = "";
    viewingStack = false;
  }
}

function renderTabs() {
  tabStrip.replaceChildren();
  tabs.forEach((tab) => {
    const wrap = el("div", viewingStack && tab.id === activeTab ? "tab is-on" : "tab");
    wrap.setAttribute("role", "presentation");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab-main";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", viewingStack && tab.id === activeTab ? "true" : "false");
    button.textContent = tab.title;
    button.title = tab.kind === "explanation" ? SAMPLE_QUESTION : (tab.ask || tab.title);
    button.addEventListener("click", () => focusTab(tab.id));
    const close = document.createElement("button");
    close.type = "button";
    close.className = "tab-close";
    close.setAttribute("aria-label", `Close ${tab.title}`);
    close.textContent = "×";
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(tab.id);
    });
    wrap.append(button, close);
    tabStrip.append(wrap);
  });
}

function syncShell() {
  if (place === "learn" && currentView === "explanation" && !stackOpen()) {
    const explanation = tabs.find((tab) => tab.kind === "explanation");
    if (explanation) {
      activeTab = explanation.id;
      viewingStack = true;
      persistTabs();
    }
  }
  const stack = stackOpen() ? activeTabRecord() : null;
  const shownId = stack?.kind === "deeper"
    ? "deeper-page"
    : stack?.kind === "explanation"
      ? "explanation"
      : place === "home"
        ? "home-page"
        : place === "notes"
        ? "notes-page"
        : place === "history"
          ? "history-page"
          : currentView;
  document.querySelectorAll(".screen").forEach((screen) => {
    const show = screen.id === shownId;
    const wasHidden = screen.hidden;
    screen.hidden = !show;
    if (show && wasHidden) animateIn(screen);
  });
  const notesOpen = place === "notes";
  const onUpload = shownId === "workspace";
  sideBar.classList.toggle("is-collapsed", !notesOpen);
  sideBar.inert = !notesOpen;
  sideBar.setAttribute("aria-hidden", notesOpen ? "false" : "true");
  tabBar.hidden = tabs.length === 0;
  const railPlace = stack?.kind === "note" ? "notes" : stack?.kind === "deeper" ? "learn" : place;
  document.querySelectorAll("[data-open-tab]").forEach((button) => {
    const on = button.dataset.openTab === railPlace && !(onUpload && button.dataset.openTab === "learn");
    button.classList.toggle("is-on", on);
    if (on) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-upload]").forEach((button) => {
    button.classList.toggle("is-on", onUpload);
    if (onUpload) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const titles = {
    workspace: "InsightCoach — Learning space",
    preparing: "InsightCoach — Building your explanation",
    explanation: "InsightCoach — Queue processing",
  };
  document.title = stack?.kind === "deeper"
    ? "InsightCoach — Going deeper"
    : place === "notes"
      ? "InsightCoach — Saved notes"
      : place === "history"
        ? "InsightCoach — History"
        : titles[currentView];
  renderTabs();
  if (shownId === "explanation" && stepsFinished) {
    renderNotePicks();
    fillNoteTargets();
  }
}

function focusTab(id, options = {}) {
  if (!tabs.some((tab) => tab.id === id)) return;
  activeTab = id;
  viewingStack = true;
  const tab = activeTabRecord();
  place = tab.kind === "note" ? "notes" : "learn";
  persistTabs();
  if (tab.kind === "note") renderNotesLibrary();
  if (tab.kind === "deeper") renderDeeper();
  if (tab.kind === "explanation" && currentView !== "explanation") show("explanation");
  syncShell();
  if (!options.keepScroll) document.getElementById("main")?.scrollTo({ top: 0 });
}

function openPlace(kind, options = {}) {
  place = kind;
  viewingStack = false;
  persistTabs();
  if (kind === "notes") renderNotesLibrary();
  if (kind === "history") renderHistory();
  syncShell();
  if (!options.keepScroll) document.getElementById("main")?.scrollTo({ top: 0 });
}

function openNoteTab(name) {
  let tab = tabs.find((item) => item.kind === "note" && item.noteName === name);
  if (!tab) {
    tab = { id: `note-${Date.now().toString(36)}`, kind: "note", title: name, noteName: name };
    tabs.push(tab);
  }
  focusTab(tab.id);
}

function closeTab(id) {
  const index = tabs.findIndex((tab) => tab.id === id);
  if (index < 0) return;
  const closing = tabs[index];
  const wasActive = viewingStack && activeTab === id;
  tabs.splice(index, 1);
  if (!wasActive) {
    if (activeTab === id) activeTab = "";
    persistTabs();
    syncShell();
    return;
  }
  const next = tabs[index];
  const prev = tabs[index - 1];
  const neighbor = [next, prev].find((tab) => tab && tab.kind === closing.kind) || next || prev;
  if (neighbor) {
    focusTab(neighbor.id);
    return;
  }
  activeTab = "";
  viewingStack = false;
  place = closing.kind === "note" ? "notes" : "learn";
  persistTabs();
  if (place === "notes") renderNotesLibrary();
  syncShell();
}

function renderNotesLibrary() {
  pruneNoteTabs();
  const notes = loadNotes();
  const tab = stackOpen() ? activeTabRecord() : null;
  const only = tab?.kind === "note" ? tab.noteName : "";
  const shown = only ? notes.filter((note) => note.name === only) : [];
  noteLibrary.replaceChildren();
  sideNotes.replaceChildren();
  notesEmpty.hidden = Boolean(only && shown.length);
  notesSideEmpty.hidden = notes.length > 0;

  const fresh = document.createElement("button");
  fresh.type = "button";
  fresh.className = "side-note";
  fresh.textContent = "New note";
  fresh.addEventListener("click", createBlankNote);
  sideNotes.append(fresh);

  notes.forEach((note) => {
    const jump = document.createElement("button");
    jump.type = "button";
    jump.className = only === note.name ? "side-note is-on" : "side-note";
    jump.textContent = note.name;
    jump.addEventListener("click", () => openNoteTab(note.name));
    sideNotes.append(jump);
  });

  shown.forEach((note) => {
    const index = notes.findIndex((item) => item.name === note.name);
    const sheet = el("article", "note-sheet");
    const header = el("header");
    const nameInput = document.createElement("input");
    nameInput.className = "note-name-edit";
    nameInput.type = "text";
    nameInput.maxLength = 80;
    nameInput.value = note.name;
    nameInput.setAttribute("aria-label", "Note name");
    nameInput.addEventListener("change", () => renameNote(index, nameInput));
    header.append(nameInput);
    const actions = el("div", "note-actions");
    const download = document.createElement("button");
    download.type = "button";
    download.className = "btn-quiet";
    download.textContent = "Export";
    download.addEventListener("click", () => {
      const current = loadNotes()[index];
      if (current) exportNote(current);
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn-quiet";
    remove.dataset.removeNote = String(index);
    remove.textContent = "Remove";
    actions.append(download, remove);
    header.append(actions);
    const area = document.createElement("textarea");
    area.className = "note-sheet-body";
    area.value = noteDocument(note);
    area.placeholder = "Write the page in your own words…";
    area.setAttribute("aria-label", "Note");
    area.addEventListener("input", () => {
      fitSheet(area);
      const stored = loadNotes();
      const current = stored[index];
      if (!current) return;
      current.text = area.value;
      delete current.items;
      persistNotes(stored);
    });
    sheet.append(header, area);
    noteLibrary.append(sheet);
    requestAnimationFrame(() => fitSheet(area));
  });
}

function renameNote(index, input) {
  const notes = loadNotes();
  const note = notes[index];
  if (!note) return;
  const previous = note.name;
  const next = input.value.trim();
  if (!next || next === previous) {
    input.value = previous;
    return;
  }
  if (notes.some((item, itemIndex) => itemIndex !== index && item.name.toLowerCase() === next.toLowerCase())) {
    input.value = previous;
    live("A note already uses that name.");
    return;
  }
  note.name = next;
  persistNotes(notes, notePick.value === previous ? next : notePick.value);
  tabs.forEach((tab) => {
    if (tab.kind === "note" && tab.noteName === previous) {
      tab.noteName = next;
      tab.title = next;
    }
  });
  persistTabs();
  renderNotesLibrary();
  syncShell();
  live(`Renamed the note to ${next}.`);
}

function deeperSections(ask) {
  const question = ask.trim();
  const lower = question.toLowerCase();
  if (disallowed(question)) {
    return [
      {
        title: "This stays off grades",
        body: "InsightCoach can't grade work or write something to submit. Ask what you want made clearer about the lecture, and this tab will stay on that.",
      },
    ];
  }
  let closer = `You asked to go further on “${question}”. The Week 04 queue does not pay for dequeue by sliding every later item left. It keeps a front index. Removing the front item advances that index, so the other items stay where they are.`;
  if (/analog|real life|example|story|like a/.test(lower)) {
    closer = `You asked to go further on “${question}”. Picture a round counter with a sign that says who is next. When that person leaves, the sign moves forward. Nobody behind them shuffles into a new square. The sign is the front index, and it is the extra memory the lecture uses instead of a shift.`;
  } else if (/memor|space|index|constant|o\(1\)|cost/.test(lower)) {
    closer = `You asked to go further on “${question}”. The extra memory is a handful of integers: front, rear, size, and the capacity of the array. Dequeue writes a new front with modulo. It does not allocate a second copy of the queue, and it does not slide the remaining items. That is why the lecture calls the removal constant time and treats the index as the memory cost.`;
  } else if (/empty|full|size|wrap|slot/.test(lower)) {
    closer = `You asked to go further on “${question}”. After the indices wrap, front and rear can sit on the same slot for two reasons: size is 0, or size equals capacity. These slides keep a size counter so those two states stay distinct. They do not give up a slot to tell them apart.`;
  } else if (/enqueue|rear|add|join|insert/.test(lower)) {
    closer = `You asked to go further on “${question}”. Enqueue writes at rear, then sets rear to (rear + 1) mod capacity. The wrap is what lets the buffer reuse slots the front has already left. The items already waiting are not copied.`;
  }
  return [
    {
      title: "Going deeper",
      body: closer,
    },
    {
      title: "What stays assumed",
      body: "This tab follows the Week 04 circular buffer: a fixed array, a front index, a rear index, and a size counter. If the lecturer used a linked list instead, the same arrival order would be stored with nodes rather than indices. The other steps are left as they were, and this is not a grade.",
    },
  ];
}

function renderDeeperList() {
  const list = document.getElementById("deeper-list");
  if (!list) return;
  list.replaceChildren();
  const deeperTabs = tabs.filter((tab) => tab.kind === "deeper");
  if (!deeperTabs.length) return;
  list.append(el("p", "deeper-past", "Open tabs"));
  deeperTabs.forEach((tab) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = tab.id === activeTab ? "side-note is-on" : "side-note";
    button.textContent = tab.title;
    button.addEventListener("click", () => focusTab(tab.id));
    list.append(button);
  });
}

function renderDeeper() {
  const tab = activeTabRecord();
  const title = document.getElementById("deeper-title");
  const lead = document.getElementById("deeper-lead");
  const body = document.getElementById("deeper-body");
  if (!title || !body || tab?.kind !== "deeper") return;
  const sections = tab.sections?.length ? tab.sections : deeperSections(tab.ask || "");
  title.textContent = tab.ask || tab.title;
  const refused = sections.some((section) => section.title === "This stays off grades");
  lead.hidden = !refused;
  if (refused) lead.textContent = "Ask for a clearer step. This tab will not grade anything.";
  body.replaceChildren();
  sections.forEach((section) => {
    const block = el("section", "deeper-block");
    block.append(el("h2", null, section.title), el("p", null, section.body));
    body.append(block);
  });
}

function ensureExplanationTab() {
  if (tabs.some((tab) => tab.kind === "explanation")) return;
  tabs.push({
    id: "explanation",
    kind: "explanation",
    title: SAMPLE_QUESTION,
    noteName: "",
    ask: "",
    sections: [],
  });
}

function openDeeperTab(ask) {
  ensureExplanationTab();
  const sections = deeperSections(ask);
  const title = ask.length > 28 ? `${ask.slice(0, 28).trim()}…` : ask;
  const tab = {
    id: `deeper-${Date.now().toString(36)}`,
    kind: "deeper",
    title,
    noteName: "",
    ask,
    sections,
  };
  tabs.push(tab);
  focusTab(tab.id);
  live(sections.some((section) => section.title === "This stays off grades")
    ? "That request stays off grades."
    : "Opened a deeper tab on the main page.");
}

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "null");
    if (!parsed || !Array.isArray(parsed.entries)) return;
    historyEntries = parsed.entries;
    historyIndex = Number.isInteger(parsed.index) ? parsed.index : historyEntries.length - 1;
  } catch {
    historyEntries = [];
    historyIndex = -1;
  }
}

function persistHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify({ index: historyIndex, entries: historyEntries }));
}

function clearHistory() {
  historyEntries = [];
  historyIndex = -1;
  persistHistory();
  renderHistory();
}

function captureTrail() {
  const steps = {};
  STEPS.forEach((step) => {
    const st = state[step.id];
    steps[step.id] = { base: st.base, skin: st.skin, ask: st.ask };
  });
  return { questionPassed, unlockedThrough, stepsFinished, steps };
}

function applyTrail(entry) {
  questionPassed = !!entry.questionPassed;
  unlockedThrough = entry.unlockedThrough || 1;
  stepsFinished = !!entry.stepsFinished;
  STEPS.forEach((step) => {
    const saved = entry.steps?.[step.id] || {};
    state[step.id] = {
      base: saved.base || "original",
      skin: saved.skin || "none",
      ask: saved.ask || "",
      inspect: false,
      flag: false,
    };
  });
}

function pushHistory(label) {
  const entry = {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    label,
    at: Date.now(),
    ...captureTrail(),
  };
  historyEntries = historyEntries.slice(0, historyIndex + 1);
  historyEntries.push(entry);
  historyIndex = historyEntries.length - 1;
  persistHistory();
  renderHistory();
}

function dayLabel(at) {
  const date = new Date(at);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const pretty = date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  if (date.toDateString() === today.toDateString()) return `Today — ${pretty}`;
  if (date.toDateString() === yesterday.toDateString()) return `Yesterday — ${pretty}`;
  return pretty;
}

function renderHistory() {
  const query = historyQuery.trim().toLowerCase();
  const matches = historyEntries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => !query || entry.label.toLowerCase().includes(query));
  historyList.replaceChildren();
  const hasRows = matches.length > 0;
  historyEmpty.hidden = hasRows;
  historyEmpty.textContent = historyEntries.length
    ? "Nothing in history matches that search."
    : "Each change in an explanation is kept here.";
  if (historyCount) {
    historyCount.textContent = historyEntries.length
      ? `${historyEntries.length} ${historyEntries.length === 1 ? "visit" : "visits"}`
      : "No visits yet";
  }
  let lastDay = "";
  for (let cursor = matches.length - 1; cursor >= 0; cursor -= 1) {
    const { entry, index } = matches[cursor];
    const day = dayLabel(entry.at);
    if (day !== lastDay) {
      lastDay = day;
      historyList.append(el("h2", "history-day", day));
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === historyIndex ? "history-row is-current" : "history-row";
    button.dataset.history = String(index);
    const time = new Date(entry.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    button.append(
      el("span", "history-time", time),
      el("span", "history-label", entry.label),
      el("span", "history-here", index === historyIndex ? "You are here" : "")
    );
    historyList.append(button);
  }
}

function restoreHistory(index) {
  const entry = historyEntries[index];
  if (!entry) return;
  historyIndex = index;
  applyTrail(entry);
  persistHistory();
  renderHistory();
  if (currentView !== "explanation") show("explanation");
  else if (stepsEl.childElementCount === 0) mountExplanation(false);
  else {
    refreshCards();
    renderNotePicks();
  }
  openPlace("learn", { keepScroll: true });
  live(`Back to ${entry.label}.`);
  const target = !questionPassed
    ? document.getElementById("question-card")
    : stepsFinished
      ? saveBar
      : cards.get(Math.min(unlockedThrough, STEPS.length))?.root;
  target?.scrollIntoView({ behavior: motionQuery.matches ? "auto" : "smooth", block: "center" });
}

function noteDocument(note) {
  if (typeof note?.text === "string") return note.text;
  return (note?.items || []).map((item) => {
    const label = String(item.label || "").trim();
    const body = String(item.body || "").trim();
    if (label && body) return `${label}\n${body}`;
    return label || body;
  }).filter(Boolean).join("\n\n");
}

function notePreview(note) {
  const line = noteDocument(note).split("\n").map((part) => part.trim()).find(Boolean) || "Empty page";
  return line.length > 90 ? `${line.slice(0, 90)}…` : line;
}

function exportFileName(name) {
  const clean = String(name || "").replace(/[\\/:*?"<>|]+/g, "").trim().slice(0, 80);
  return `${clean || "note"}.txt`;
}

function exportNote(note) {
  const body = `${note.name}\n\n${noteDocument(note)}\n`;
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = exportFileName(note.name);
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  live(`Exported ${note.name}.`);
}

function fitSheet(area) {
  area.style.height = "auto";
  area.style.height = `${area.scrollHeight}px`;
}

function createBlankNote() {
  const notes = loadNotes();
  const taken = new Set(notes.map((note) => note.name.toLowerCase()));
  let name = "Untitled";
  let count = 2;
  while (taken.has(name.toLowerCase())) {
    name = `Untitled ${count}`;
    count += 1;
  }
  notes.push({ name, text: "" });
  persistNotes(notes);
  openNoteTab(name);
  document.querySelector(".note-sheet-body")?.focus();
  live(`Started ${name}.`);
}

function noteTargetMode() {
  return noteWhere.querySelector("input:checked")?.value || "new";
}

function fillNoteTargets(prefer) {
  const notes = loadNotes();
  const names = notes.map((note) => note.name);
  const selected = prefer || notePick.value;
  const current = [...notePick.options].map((option) => option.value);
  const same = names.length === current.length && names.every((name, index) => name === current[index]);
  if (!same) {
    notePick.replaceChildren();
    notes.forEach((note) => {
      const option = document.createElement("option");
      option.value = note.name;
      option.textContent = note.name;
      notePick.append(option);
    });
  }
  if ([...notePick.options].some((option) => option.value === selected)) notePick.value = selected;
  const empty = notes.length === 0;
  notePick.hidden = empty;
  noteTargetEmpty.hidden = !empty;
}

function syncNoteTarget() {
  fillNoteTargets();
  const adding = noteTargetMode() === "existing";
  noteNewFields.hidden = adding;
  noteExistingFields.hidden = !adding;
}

function selectedNoteItems() {
  const items = [];
  if (noteQuestion.checked) items.push({ label: "Your question", body: SAMPLE_QUESTION });
  [...notePicks.querySelectorAll("input:checked")].forEach((input) => {
    const step = STEPS.find((item) => item.id === Number(input.value));
    if (!step) return;
    const view = getView(step, state[step.id]);
    items.push({ label: `Step ${step.id}. ${view.title}`, body: view.body });
  });
  return items;
}

noteWhere.addEventListener("change", syncNoteTarget);

function appendToNote(notes, index, chunk) {
  const name = notes[index].name;
  const current = noteDocument(notes[index]).trim();
  notes[index] = { name, text: current ? `${current}\n\n${chunk}` : chunk };
  persistNotes(notes);
  live(`Added to ${name}. No score was recorded.`);
  openNoteTab(name);
}

const saveMore = document.getElementById("save-more");
const saveMorePanel = document.getElementById("save-more-panel");
saveMore.addEventListener("click", () => {
  const open = saveMorePanel.hidden;
  
  saveBar.classList.toggle("is-panel-open", open);
  saveMore.setAttribute("aria-expanded", open ? "true" : "false");
  
  if (open) {
    saveMorePanel.classList.remove("is-closing");
    saveMorePanel.hidden = false;
    animateIn(saveMorePanel);
    renderNotePicks();
    if (loadNotes().length) {
      const existing = noteWhere.querySelector('input[value="existing"]');
      if (existing) existing.checked = true;
    }
    syncNoteTarget();
  } else {
    saveMorePanel.classList.add("is-closing");
    setTimeout(() => {
      saveMorePanel.hidden = true;
      saveMorePanel.classList.remove("is-closing");
    }, 250);
  }
});

saveBtn.addEventListener("click", () => {
  if (!stepsFinished) return;
  fillNoteTargets();
  renderNotePicks();
  const items = selectedNoteItems();
  if (!items.length) {
    noteError.hidden = false;
    noteError.textContent = "Choose the question or at least one step.";
    if (saveMorePanel.hidden) {
      saveMorePanel.hidden = false;
      saveMore.setAttribute("aria-expanded", "true");
    }
    return;
  }
  const chunk = items.map((item) => `${item.label}\n${item.body}`).join("\n\n");
  const notes = loadNotes();
  if (saveMorePanel.hidden) {
    if (notes.length > 1) {
      saveMore.click();
      return;
    }
    if (notes.length === 1) {
      noteError.hidden = true;
      appendToNote(notes, 0, chunk);
      return;
    }
    if (!noteName.value.trim()) noteName.value = "Week 04 queues";
  }
  if (noteTargetMode() === "existing") {
    if (!notes.length) {
      noteError.hidden = false;
      noteError.textContent = "Save a new note first.";
      return;
    }
    const name = notePick.value;
    const index = notes.findIndex((note) => note.name === name);
    if (index < 0) {
      noteError.hidden = false;
      noteError.textContent = "Choose a note to add this to.";
      notePick.focus();
      return;
    }
    noteError.hidden = true;
    appendToNote(notes, index, chunk);
    return;
  }
  const name = noteName.value.trim();
  if (!name) {
    noteError.hidden = false;
    noteError.textContent = "Name this note before saving.";
    noteName.focus();
    return;
  }
  if (notes.some((note) => note.name.toLowerCase() === name.toLowerCase())) {
    noteError.hidden = false;
    noteError.textContent = "That note already exists. Choose Add to a note.";
    noteName.focus();
    return;
  }
  noteError.hidden = true;
  notes.push({ name, text: chunk });
  persistNotes(notes);
  noteName.value = "";
  live(`Saved the note ${name}. No score was recorded.`);
  openNoteTab(name);
});

noteLibrary.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-note]");
  if (!button) return;
  const notes = loadNotes();
  const index = Number(button.dataset.removeNote);
  const removed = notes[index];
  if (!removed) return;
  const neighbor = notes[index + 1] || notes[index - 1] || null;
  notes.splice(index, 1);
  persistNotes(notes);
  tabs = tabs.filter((tab) => tab.kind !== "note" || tab.noteName !== removed.name);
  if (!tabs.length) tabs = [{ id: "learn", kind: "learn", title: "Learning space", noteName: "" }];
  if (neighbor) openNoteTab(neighbor.name);
  else openPlace("notes");
  live(`Removed ${removed.name}.`);
});

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history]");
  if (!button) return;
  restoreHistory(Number(button.dataset.history));
});

historySearch.addEventListener("input", () => {
  historyQuery = historySearch.value;
  renderHistory();
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => openPlace(button.dataset.openTab));
});

document.querySelectorAll("[data-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    place = "learn";
    viewingStack = false;
    persistTabs();
    show("workspace");
    live("Back at the upload.");
  });
});

document.getElementById("new-note").addEventListener("click", createBlankNote);

window.addEventListener("resize", () => {
  document.querySelectorAll(".note-sheet-body").forEach(fitSheet);
});

function bindDeeperForm(formId, fieldId, errorId) {
  document.getElementById(formId).addEventListener("submit", (event) => {
    event.preventDefault();
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    const ask = field.value.trim();
    if (!ask) {
      error.hidden = false;
      error.textContent = "Say what you want to go deeper on.";
      field.focus();
      return;
    }
    error.hidden = true;
    field.value = "";
    openDeeperTab(ask);
  });
}

bindDeeperForm("deeper-form", "deeper-ask", "deeper-error");
bindDeeperForm("deeper-follow", "deeper-follow-ask", "deeper-follow-error");

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || currentView !== "explanation") return;
  let closed = false;
  STEPS.forEach((step) => {
    const st = state[step.id];
    if (!st.inspect && !st.flag) return;
    st.inspect = false;
    st.flag = false;
    closed = true;
    updateCard(step.id);
  });
  if (closed) live("Closed the open step details.");
});

window.addEventListener("hashchange", () => applyView(parseHash()));

loadTabs();
loadHistory();
pruneNoteTabs();
renderNotesLibrary();
renderHistory();

if (!location.hash || location.hash === "#" || location.hash === "#/") {
  place = "home";
  viewingStack = false;
  history.replaceState(null, "", "#/");
}
applyView(parseHash());
