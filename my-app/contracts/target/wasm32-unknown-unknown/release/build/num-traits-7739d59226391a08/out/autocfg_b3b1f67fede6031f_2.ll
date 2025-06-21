; ModuleID = 'autocfg_b3b1f67fede6031f_2.27bfdf1b2883fed0-cgu.0'
source_filename = "autocfg_b3b1f67fede6031f_2.27bfdf1b2883fed0-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

; autocfg_b3b1f67fede6031f_2::probe
; Function Attrs: nounwind
define dso_local void @_ZN26autocfg_b3b1f67fede6031f_25probe17h521d6e1c832c4895E() unnamed_addr #0 {
start:
  %0 = alloca [4 x i8], align 4
  store i32 -2147483648, ptr %0, align 4
  %_0.i = load i32, ptr %0, align 4
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind speculatable willreturn memory(none)
declare i32 @llvm.bitreverse.i32(i32) #1

attributes #0 = { nounwind "target-cpu"="generic" }
attributes #1 = { nocallback nofree nosync nounwind speculatable willreturn memory(none) }

!llvm.ident = !{!0}

!0 = !{!"rustc version 1.79.0 (129f3b996 2024-06-10)"}
