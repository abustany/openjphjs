{
  description = "dicom-pipeline";

  inputs = {
    nixpkgs.url      = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url  = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
        rev = if (self ? shortRev) then self.shortRev else "dev";

        pkgNativeBuildInputs = [
          pkgs.cmake
          pkgs.emscripten
        ];
        pkgBuildInputs = [
        ];
      in
      with pkgs;
      {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = pkgNativeBuildInputs;
          buildInputs = pkgBuildInputs;
        };
      }
    );
}
