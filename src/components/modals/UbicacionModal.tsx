import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { API_UBICACION_PATH } from "../../config";
import { Ubicacion, UbicacionForm } from "../../types/Ubicacion";
import FormModal from "./FormModal";
import { useService } from "../../hooks/useService";
import { getEntityById } from "../../services/BackendService";
import { useEffect } from "react";

interface UbicacionModalProps {
  open: boolean;
  mode: "edit" | "create";
  enableDelete?: boolean;
  id?: number;
  setOpen: (open: boolean) => void;
  triggerRefresh?: () => void;
}

export default function UbicacionModal({
  open,
  mode,
  enableDelete,
  id,
  setOpen,
  triggerRefresh,
}: UbicacionModalProps) {
  const { data: ubicacion } = useService(async () => {
    if (id) {
      return await getEntityById<Ubicacion>(API_UBICACION_PATH, id);
    }
  }, [API_UBICACION_PATH, id]);

  const formMethods = useForm<UbicacionForm>();

  useEffect(() => {
    if (ubicacion) {
      formMethods.reset({
        nombre: ubicacion.nombre,
      });
    }
  }, [ubicacion]);

  return (
    <FormModal
      formMethods={formMethods}
      open={open}
      setOpen={setOpen}
      triggerRefresh={triggerRefresh}
      mode={mode}
      entityId={id}
      baseApiPath={API_UBICACION_PATH}
      createSucessMsg="Ubicación creada con éxito"
      editSucessMsg="Ubicación editada con éxito"
      deleteSucessMsg="Ubicación eliminada con éxito"
      enableDelete={enableDelete}
      title={
        mode === "edit"
          ? "Editar Ubicación"
          : mode === "create"
          ? "Crear Ubicación"
          : ""
      }
    >
      <Input label="Nombre" name="nombre" />
    </FormModal>
  );
}
