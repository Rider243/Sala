exports.fn_tag=fn_tag;
function fn_tag(socket, obj_tag_value){

  socket.emit('Count_Bag_L1',obj_tag_value['Count_Bag_L1']);
  socket.emit('Count_Bag_L2',obj_tag_value['Count_Bag_L2']);
  socket.emit('Count_Bag_L3',obj_tag_value['Count_Bag_L3']);
  socket.emit('Count_Bag_L4',obj_tag_value['Count_Bag_L4']);
  socket.emit('Count_Bag_L5',obj_tag_value['Count_Bag_L5']);
  socket.emit('Count_Bag_L6',obj_tag_value['Count_Bag_L6']);
  socket.emit('Count_Bag_Total',obj_tag_value['Count_Bag_Total']);
  socket.emit('start',obj_tag_value['start']);
     
}