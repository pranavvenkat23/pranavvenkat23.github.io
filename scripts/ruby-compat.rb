# Local-only compatibility shim; see scripts/serve.sh.
class Object
  def tainted?; false; end
  def untaint; self; end
end
