; ModuleID = 'autocfg_0bc01d97b74e1685_4.ab0063a651187f8b-cgu.0'
source_filename = "autocfg_0bc01d97b74e1685_4.ab0063a651187f8b-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

@str.0 = internal unnamed_addr constant [25 x i8] c"attempt to divide by zero"
@alloc_e6758488a51c40069ade2309416f0500 = private unnamed_addr constant <{ [6 x i8] }> <{ [6 x i8] c"<anon>" }>, align 1
@alloc_d7950f157da5068f065ef3236df1bb76 = private unnamed_addr constant <{ ptr, [12 x i8] }> <{ ptr @alloc_e6758488a51c40069ade2309416f0500, [12 x i8] c"\06\00\00\00\01\00\00\00\1F\00\00\00" }>, align 4

; autocfg_0bc01d97b74e1685_4::probe
; Function Attrs: nounwind
define hidden void @_ZN26autocfg_0bc01d97b74e1685_45probe17he6146993ba46e4f4E() unnamed_addr #0 {
start:
  %0 = call i1 @llvm.expect.i1(i1 false, i1 false)
  br i1 %0, label %panic.i, label %"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h3d8604696c602caaE.exit"

panic.i:                                          ; preds = %start
; call core::panicking::panic
  call void @_ZN4core9panicking5panic17hab909960ba2e90c9E(ptr align 1 @str.0, i32 25, ptr align 4 @alloc_d7950f157da5068f065ef3236df1bb76) #3
  unreachable

"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h3d8604696c602caaE.exit": ; preds = %start
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind willreturn memory(none)
declare hidden i1 @llvm.expect.i1(i1, i1) #1

; core::panicking::panic
; Function Attrs: cold noinline noreturn nounwind
declare dso_local void @_ZN4core9panicking5panic17hab909960ba2e90c9E(ptr align 1, i32, ptr align 4) unnamed_addr #2

attributes #0 = { nounwind "target-cpu"="generic" }
attributes #1 = { nocallback nofree nosync nounwind willreturn memory(none) }
attributes #2 = { cold noinline noreturn nounwind "target-cpu"="generic" }
attributes #3 = { noreturn nounwind }

!llvm.ident = !{!0}

!0 = !{!"rustc version 1.77.1 (7cf61ebde 2024-03-27)"}
