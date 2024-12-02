
const nil = {};
function list(_current, _next){ return { current: _current, next: _next }; }
function current(el){ return el['current']; }
function next(el){ return el['next']; }

function stack__make(_list, _size){     return {list: _list, size: _size}; }
function stack__empty(){                return stack__make(nil, 0); }
function stack__isEmpty(stack){         return stack.list === nil; }
function stack__get_head(stack){        return current(stack.list); }
function stack__get_size(stack){        return stack.size; }
function stack__add_head(stack, el){    return stack__make(list(el, stack.list), stack__get_size(stack)+1); }
function stack__remove_head(stack){     return stack__make(next(stack.list), stack__get_size(stack)-1); }

export {nil, stack__make, stack__empty, stack__isEmpty, stack__get_head, stack__get_size, stack__add_head, stack__remove_head};