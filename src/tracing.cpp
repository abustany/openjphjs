#include "tracing.hpp"

#ifdef __EMSCRIPTEN__

#include <emscripten/trace.h>

void configureTracing(void) {
  emscripten_trace_configure("http://127.0.0.1:5000/", "openjphjs");
}

void reportFrameStart() {
  emscripten_trace_record_frame_start();
}

void reportFrameEnd() {
  emscripten_trace_record_frame_end();
}

void reportMemoryUsage() {
  emscripten_trace_report_memory_layout();
  emscripten_trace_report_off_heap_data();
}

void reportMessage(const char *channel, const char *message) {
  emscripten_trace_log_message(channel, message);
}

void closeTracing(void) {
  emscripten_trace_close();
}

#else

void configureTracing(void) {}
void reportFrameStart(void) {};
void reportFrameEnd(void) {};
void reportMemoryUsage() {}
void reportMessage(const char *channel, const char *message) {}
void closeTracing(void) {}

#endif
