# 01. Why We Want Standalone Components

## Introduction

在本小節中，我們將探討 Angular 中的 Standalone Components 概念，並了解它們所解決的問題。我們還將學習如何建立和使用 Angular 應用程式中的 Standalone Components。

## Demo Application

- [`standalone-app`](../../standalone-app/)

## The Problem with Standard Angular Apps

儘管範例應用程式正常運作，但它凸顯了標準 Angular 應用程式的一個常見問題 - **冗贅的程式碼**。

在建立 Angular 應用程式時，您需要撰寫大量的冗贅程式碼，例如元件的組織和宣告、模組的導入和匯出等等。儘管這些工作並不困難，但這額外的工作可能讓人感到繁瑣，並使重構變得具有挑戰性，這也與 React 等其他框架形成對比，這些框架不需要這些冗贅程式碼。

Angular 在內部需要這些模組來理解可用的元件及其關聯。因此，從 Angular 的角度來看，這些冗贅程式碼是必要的。然而，如果我們能夠消除對這些模組的需求，那將是非常有利的。這就是 Standalone Components 的用途所在。

## Introducing Standalone Components

Standalone Components 提供了在 Angular 中解決冗贅程式碼問題的解決方案。Angular 團隊開發了一種使用 Angular 的方式，讓我們可以去除 `NgModule` ，改用 Standalone Components 和 Standalone Component 指令。這些 Standalone Components 和 Standalone Component 指令不需要在模組中進行明確宣告。最好的部分是，這種新方法可以與傳統的 Angular 應用程式建立方式混合使用。

透過利用 Standalone Components ，我們可以簡化程式碼庫、減少冗贅程式碼並增強重構能力。在接下來的幾分鐘中，我們將探索如何建立和使用 Standalone Components 以及與 `NgModule` 一起使用。