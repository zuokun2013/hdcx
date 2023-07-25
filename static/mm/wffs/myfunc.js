let transformer = new markmap.Transformer();
    const { root, features } = transformer.transform(markdown);
    console.log(root);

((w, x, k, M) => { const _ = w(); window.mm = _.Markmap.create("svg#mindmap", x == null ? void 0 : x(_, M), k) })(() => window.markmap, (e, t) => e.deriveOptions(t), root, { "color": null, "maxWidth": 300 });

window.addEventListener("keypress", log);

var mmDataRoot = mm.state.data;
var currRoot = mmDataRoot;
var gl_currNode = mmDataRoot;
var flatNodeQueue = [];
var flatNodeQueuePos = 0;
let mmNodeMap = new Map();
// flatNodeQueue.push(2);         // queue is now [2]
// flatNodeQueue.push(5);         // queue is now [2, 5]
// var i = flatNodeQueue.shift(); // queue is now [5]

function buildCurrTree(root) {
    flatNodeQueue = [];
    flatNodeQueuePos = 0; 
    mmNodeMap = new Map();

    gl_currNode = root;
    // Stack to store the nodes
    var nodes = [];

    // Push the current node onto the stack
    nodes.push(root);

    // Loop while the stack is not empty
    while (nodes.length != 0) {

        // Store the current node and pop
        // it from the stack
        var curr = nodes.pop();
        flatNodeQueue.push(curr);
        mmNodeMap.set(curr.state.id.toString(), curr);
        curr.payload.fold = true;

        // Current node has been travarsed
        if (curr != null && curr.children != null) {
            //document.write(curr.key + " ");

            // Store all the childrent of
            // current node from right to left.
            for (var i = curr.children.length - 1; i >= 0; i--) {
                nodes.push(curr.children[i]);
                // if (curr.children[i] != null && curr.children[i].children != null) {
                // 	nodes.push(curr.children[i]);
                // }
            }
        }
    }
}

const hideAll = (target) => {
  target.payload = {
    ...target.payload,
    fold: true,
  }

  target.children?.forEach((t) => {
    hideAll(t)
  })
}

const showAll = (target) => {
  target.payload = {
    ...target.payload,
    fold: false,
  }

  target.children?.forEach((t) => {
    showAll(t)
  })
}

const showLevel = (target, level) => {
    console.log('target.depth=' + target.depth );
    console.log('target.state.path=' + target.state.path );
    console.log('currRoot.depth=' + currRoot.depth );
    
    if(target.state.path.split(".").length - currRoot.state.path.split(".").length >= level -1) return;
    target.payload = {
        ...target.payload,
        fold: false,
    }

  target.children?.forEach((t) => {
    showLevel(t, level)
  })
}

const toggleFold = (target, foldFlag) => {
    console.log('target.depth=' + target.depth );
    console.log('currRoot.depth=' + currRoot.depth );
    target.payload = {
        ...target.payload,
        fold: foldFlag,
    }

  target.children?.forEach((t) => {
    toggleFold(t, foldFlag)
  })
}

function gotoFirstChild(currNode) {
    console.log("gotoFirstChild=" + currNode.state.path);
    if(currNode != null && currNode.children != null) {
        console.log("currNode.children=" + currNode.children);
        currNode.payload.fold = false;			
        gl_currNode = currNode.children[0];
        console.log("gl_currNode.content=" + gl_currNode.content);
        console.log("gl_currNode.state.path=" + gl_currNode.state.path);
        
    }
}

function gotoPreNode(currNode) {
    console.log("gotoPreNode=" + currNode.state.path);
    const currPath = currNode.state.path.split(".");
    console.log(currPath);
    if(currPath.length >= 2) {
        console.log("parent id=" + currPath[currPath.length - 2]);
        parent = mmNodeMap.get(currPath[currPath.length - 2]);
        console.log(parent);
        cidx = parent.children.indexOf(currNode);
        if(cidx >= 1) {
            nextSibling = parent.children[cidx - 1];
            gl_currNode = nextSibling;
            
        }
        highlightNode(gl_currNode);
    }
}

function gotoParent(currNode) {
    const currPath = currNode.state.path.split(".");
    console.log(currPath);
    if(currPath.length >= 2) {
        console.log("parent id=" + currPath[currPath.length - 2]);
        parent = mmNodeMap.get(currPath[currPath.length - 2]);
        console.log(parent);
        gl_currNode = parent;
        highlightNode(gl_currNode);
        
    }
}

function gotoNextSibling(currNode) {
    console.log("gotoNextSibling=" + currNode.state.path);
    const currPath = currNode.state.path.split(".");
    console.log(currPath);
    if(currPath.length >= 2) {
        console.log("parent id=" + currPath[currPath.length - 2]);
        parent = mmNodeMap.get(currPath[currPath.length - 2]);
        console.log(parent);
        cidx = parent.children.indexOf(currNode);
        if(cidx < parent.children.length -1) {
            nextSibling = parent.children[cidx + 1];
            gl_currNode = nextSibling;
            highlightNode(gl_currNode);
        }
    }
}

function highlightNode(currNode) {
    const collection = document.getElementsByClassName("notify-item");
    for (let i = 0; i < collection.length; i++) {
        collection[i].remove();
    }
    notify({message: currNode.content});
    const collection2 = document.querySelectorAll("[data-path]");
    for (let i = 0; i < collection2.length; i++) {
        collection2[i].style.cssText = ''
        console.log(collection2[i]);
    }
    const collection3 = document.querySelectorAll("[data-path='" + currNode.state.path + "']");
    for (let i = 0; i < collection3.length; i++) {
        collection3[i].style.cssText = 'font-weight: bold;'
        console.log(collection3[i]);
    }
}

function renderMMNodeWithPath() {
    hideAll(currRoot);

  // var currNode = flatNodeQueue.shift();
  console.log('---------------- renderMMNodeWithPath -------------')
  console.log(flatNodeQueuePos);
  console.log(flatNodeQueue);
  
  var currNode = flatNodeQueue[flatNodeQueuePos];
  
  // if(flatNodeQueuePos>0) {
  // }
  if (currNode != null) {
    console.log(currNode);
    console.log(currNode.state.path);

    highlightNode(currNode);
    
    const currPath = currNode.state.path.split(".");
    currPath.forEach(element => {
        console.log(element);
        console.log(mmNodeMap.get(element));

        //if currRoot = ;
        // if(currRoot === mmNodeMap.get(element)) {
        // 	return true;
        // }

        mmNodeMap.get(element).payload.fold = false;
        // return true;
    });
    // mm.setData(currNode);

    if (flatNodeQueuePos > 1) {
      flatNodeQueue[flatNodeQueuePos - 1].payload.fold = false;
    //   flatNodeQueue[flatNodeQueuePos - 2].payload.fold = false;
    }
    if (flatNodeQueuePos > 2) {
      flatNodeQueue[flatNodeQueuePos - 2].payload.fold = false;
    }
    if (flatNodeQueuePos < flatNodeQueue.length - 1) {
      flatNodeQueue[flatNodeQueuePos + 1].payload.fold = false;
    //   flatNodeQueue[flatNodeQueuePos + 2].payload.fold = false;
    }
    if (flatNodeQueuePos < flatNodeQueue.length - 2) {
      flatNodeQueue[flatNodeQueuePos + 2].payload.fold = false;
    }

    mm.renderData();
    mm.fit();
  }
}

buildCurrTree(mmDataRoot);
mmDataRoot.payload.fold = false;
mm.renderData();
mm.fit();
console.log(flatNodeQueue);
console.log(mmNodeMap);

function log(e) {
  console.log(e.key);
  if (e.key === "j" && flatNodeQueuePos > 1) {
    // var testNode = mmDataRoot.children[1].children[2];
    // console.log(testNode);

    // testNode.payload.fold = !((testNode.payload) != null && testNode.payload.fold)
    // mm.renderData();
    // mm.fit();

    flatNodeQueuePos--;
    renderMMNodeWithPath();

  } else if (e.key === "k" && flatNodeQueuePos < flatNodeQueue.length) {
    flatNodeQueuePos++;
    renderMMNodeWithPath();
    console.log(mmNodeMap.size);
  } else if (e.key === "h" ) {
    flatNodeQueuePos=0;
    renderMMNodeWithPath();
  } else if (e.key === "l" ) {
    flatNodeQueuePos = flatNodeQueue.length - 1;
    renderMMNodeWithPath();
} else if (e.key === "." ) {
    //currRoot = flatNodeQueue[flatNodeQueuePos];   
    currRoot = gl_currNode;
    // flatNodeQueue = [];
    // flatNodeQueuePos = 1;     
    console.log('======================');
    console.log(currRoot);
    mm.setData(currRoot);
    buildCurrTree(mm.state.data);
    console.log('======================');
    console.log(flatNodeQueue);
    showAll(mm.state.data);
    
    console.log("mmNodeMap");
    console.log(mmNodeMap);
    // 
    // renderMMNodeWithPath();
} else if (e.key === "a" ) {
    gotoParent(gl_currNode);
    mm.renderData();
    mm.fit();
} else if (e.key === "d" ) {
    gotoFirstChild(gl_currNode);
    mm.renderData();
    mm.fit();
    highlightNode(gl_currNode);
} else if (e.key === "s") {
    gotoNextSibling(gl_currNode);
    mm.renderData();
    mm.fit();
} else if (e.key === "w" ) {
    gotoPreNode(gl_currNode);
    mm.renderData();
    mm.fit();
    highlightNode(gl_currNode);
} else if (e.key === "2" ) {
    hideAll(currRoot);
    showLevel(currRoot, 2);
    mm.renderData();
    mm.fit();    
} else if (e.key === "3" ) {
    hideAll(currRoot);
    showLevel(currRoot, 3);
    mm.renderData();
    mm.fit();
} else if (e.key === "4" ) {
    hideAll(currRoot);
    showLevel(currRoot, 4);
    mm.renderData();
    mm.fit();
} else if (e.key === "5" ) {
    hideAll(currRoot);
    showLevel(currRoot, 5);
    mm.renderData();
    mm.fit();
} else if (e.key === "6" ) {
    hideAll(currRoot);
    showLevel(currRoot, 6);
    mm.renderData();
    mm.fit();
} else if (e.key === "7" ) {
    hideAll(currRoot);
    showLevel(currRoot, 7);
    mm.renderData();
    mm.fit();
  } else if (e.key === "0") {
    //mm.fit();
    //console.log(mm.state.data);
    //flatNodeQueuePos = 0;
    showAll(currRoot);
    mm.renderData();
    mm.fit();
} else if (e.key === "t" ) {	
    //currNode = flatNodeQueue[flatNodeQueuePos];   
    currNode = gl_currNode;	
    toggleFold(currNode, !(currNode.payload.fold));
    mm.renderData();
    mm.fit();
  } else if (e.key === "d") {
    console.log(mm);
  } else if (e.key === "=") {
    mm.rescale(1.25);
  } else if (e.key === "-") {
    mm.rescale(0.8);
  } else if (e.key === "f") {
    mm.fit();
  }
}
