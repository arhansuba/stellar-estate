; ModuleID = 'autocfg_9459009838579085_2.dd6bee78dccc5084-cgu.0'
source_filename = "autocfg_9459009838579085_2.dd6bee78dccc5084-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

; autocfg_9459009838579085_2::probe
; Function Attrs: nounwind
define hidden void @_ZN26autocfg_9459009838579085_25probe17hd152e6fe5b209df1E() unnamed_addr #0 {
start:
  %0 = alloca i32, align 4
  store i32 -2147483648, ptr %0, align 4
  %_0.i = load i32, ptr %0, align 4, !noundef !1
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind speculatable willreturn memory(none)
declare hidden i32 @llvm.bitreverse.i32(i32) #1

attributes #0 = { nounwind "target-cpu"="generic" }
attributes #1 = { nocallback nofree nosync nounwind speculatable willreturn memory(none) }

!llvm.ident = !{!0}

!0 = !{!"rustc version 1.77.1 (7cf61ebde 2024-03-27)"}
!1 = !{}
