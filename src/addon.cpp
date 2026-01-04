#include <napi.h>

extern "C" {
  #include "rcheevos/include/rc_hash.h"
}

Napi::Value Hash(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    Napi::TypeError::New(env, "Expected 2 arguments: consoleId and path")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsNumber() || !info[1].IsString()) {
    Napi::TypeError::New(env, "Arguments must be (number, string)")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  uint32_t console_id = info[0].As<Napi::Number>().Uint32Value();
  std::string path = info[1].As<Napi::String>().Utf8Value();

  char hash[33];
  int result = rc_hash_generate_from_file(hash, console_id, path.c_str());

  if (!result) {
    Napi::Error::New(env, "Failed to generate hash for file: " + path)
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  return Napi::String::New(env, hash);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hash"),
              Napi::Function::New(env, Hash));
  return exports;
}

NODE_API_MODULE(rcheevos, Init)
