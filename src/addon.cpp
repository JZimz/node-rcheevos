#include <napi.h>

extern "C" {
  #include "rcheevos/include/rc_hash.h"
}

// Capture error messages from rcheevos
static std::string g_last_error;

static void error_callback(const char* message, const rc_hash_iterator_t* iterator) {
  (void)iterator; // unused
  g_last_error = message;
}

Napi::Value RHash(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    Napi::TypeError::New(env, "Expected at least 2 arguments: consoleId and path")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsNumber() || !info[1].IsString()) {
    Napi::TypeError::New(env, "Arguments must be (number, string, [buffer])")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  uint32_t console_id = info[0].As<Napi::Number>().Uint32Value();
  std::string path = info[1].As<Napi::String>().Utf8Value();

  rc_hash_iterator_t iterator;
  g_last_error.clear();

  // Check if buffer was provided (optional 3rd argument)
  if (info.Length() >= 3 && info[2].IsBuffer()) {
    Napi::Buffer<uint8_t> buffer = info[2].As<Napi::Buffer<uint8_t>>();
    rc_hash_initialize_iterator(&iterator, path.c_str(), buffer.Data(), buffer.Length());
  } else {
    rc_hash_initialize_iterator(&iterator, path.c_str(), nullptr, 0);
  }

  // Set error callback to capture detailed error messages
  iterator.callbacks.error_message = error_callback;

  char hash[33];
  int result = rc_hash_generate(hash, console_id, &iterator);

  rc_hash_destroy_iterator(&iterator);

  if (!result) {
    std::string error_msg = g_last_error.empty()
      ? "Failed to generate hash for file: " + path
      : g_last_error;
    Napi::Error::New(env, error_msg).ThrowAsJavaScriptException();
    return env.Null();
  }

  return Napi::String::New(env, hash);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "rhash"),
              Napi::Function::New(env, RHash));
  return exports;
}

NODE_API_MODULE(rcheevos, Init)
