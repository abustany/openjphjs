mergeInto(LibraryManager.library, {
  emscripten_trace_configure: function(collector_url, app_name) {
    console.log("Custom tracing up", collector_url, app_name);
  },
  emscripten_trace_record_frame_start: function() {
    console.log("TRACE: frame start");
  },
  emscripten_trace_record_frame_end: function() {
    console.log("TRACE: frame end");
  },
  emscripten_trace_report_memory_layout__deps: ['emscripten_stack_get_base', 'emscripten_stack_get_current', 'emscripten_stack_get_end', 'sbrk'],
  emscripten_trace_report_memory_layout: function() {
    console.log("TRACE: memory layout\n", {
      'static_base':  {{{ GLOBAL_BASE }}},
      'stack_base':   _emscripten_stack_get_base(),
      'stack_top':    _emscripten_stack_get_current(),
      'stack_max':    _emscripten_stack_get_end(),
      'dynamic_top':  _sbrk(0),
      'total_memory': HEAP8.length
    });
  },
  emscripten_trace_report_off_heap_data: function() {},
  emscripten_trace_close: function() {},
  emscripten_trace_record_allocation: function (address, size) {
    console.log("TRACE: alloc", address, size);
  },
  emscripten_trace_record_reallocation: function (old_address, new_address, size) {
    console.log("TRACE: realloc", address, size);
  },
  emscripten_trace_record_free: function (address) {
    console.log("TRACE: free", address);
  },
  emscripten_trace_log_message: function (channel, message) {
    console.log("TRACE: message", UTF8ToString(channel), UTF8ToString(message));
  }
});
