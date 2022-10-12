using System;
using System.Runtime.InteropServices.JavaScript;

Console.WriteLine("Hello, Browser!");

public partial class MyClass
{
    [JSExport]
    internal static string Greeting()
    {
        var text = $"Hello {Guest()}! Greetings from .NET C# Wasm";
        Console.WriteLine(text);
        return text;
    }

    [JSImport("guest", "main.js")]
    internal static partial string Guest();
}
