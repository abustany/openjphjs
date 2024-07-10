#pragma once

void configureTracing(void);
void reportFrameStart(void);
void reportFrameEnd(void);
void reportMemoryUsage(void);
void reportMessage(const char *channel, const char *message);
void closeTracing(void);
