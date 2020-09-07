var button = document.createElement('button');
var host = document.querySelector('#shadowDom_1');
var root = host.createShadowRoot();
root.innerHTML = '<button>Hello, the shadow of the world!</button>';
var realDOMHost = document.querySelector('#realDom');
realDOMHost.innerHTML += root.querySelector('button').outerHTML;
